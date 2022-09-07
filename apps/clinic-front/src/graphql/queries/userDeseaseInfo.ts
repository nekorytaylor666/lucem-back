import client from "@/client/apollo-client";
import { gql } from "@apollo/client";
import { AppointmentInfoResponse } from "src/utils/consultation-logic";
import { GET_APPOINTMENTS_INFO } from "./appointment-blank.queries";
import { GET_APPOINTMENTS_RESULTS } from "./appointment-results";
import { sortAppointmentsInfoBySessionId } from "./consultation-lists.service";

export const fetchDiseaseInfoOfUser = async (userId: string, token: string) => {
    const appointmentInfoRes = await client.query<AppointmentInfoResponse>({
        query: GET_APPOINTMENTS_INFO,
        context: {
            headers: {
                Authorization: token,
            },
        },
        variables: { userId },
    });
    const sortedAppointmentsInfo = sortAppointmentsInfoBySessionId(
        appointmentInfoRes.data,
    );

    const { getAppointmentResultsByUser } = (
        await client.query({
            query: GET_APPOINTMENTS_RESULTS,
            context: {
                headers: {
                    Authorization: token,
                },
            },
            variables: { userId },
        })
    ).data;
    const GET_ACTIVE_SESSION_PATIENT = gql`
        query GetActiveSession($userId: String!) {
            getActiveSessionByUserId(userId: $userId) {
                _id
                count
                startDate
                booking {
                    service {
                        name
                    }
                }
            }
        }
    `;
    let activeSession = null;
    activeSession = client
        .query({
            query: GET_ACTIVE_SESSION_PATIENT,
            variables: {
                userId,
            },
        })
        .then((res) => res.data.getActiveSessionByUserId)
        .catch(() => {
            console.log("Could not fetch active session");
            return null;
        });

    return {
        activeSession,
        appointmentsInfo: sortedAppointmentsInfo,
        appointmentResults: getAppointmentResultsByUser,
    };
};
