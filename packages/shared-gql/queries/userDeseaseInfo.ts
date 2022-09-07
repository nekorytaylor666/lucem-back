import { gql, useQuery } from "@apollo/client";
import {
  getAppointmentInfoUser,
  getAppointmentInfoUserVariables,
} from "@graphqlTypes/getAppointmentInfoUser";
import client from "@src/apollo/apollo-client";
import { sortAppointmentsInfoBySessionId } from "components/organisms/ConsulationLists/consultation-lists.service";
import { AppointmentInfoResponse } from "components/organisms/ConsulationLists/consultation-logic";
import { GET_APPOINTMENTS_INFO } from "./appointment-blank.queries";
import { GET_APPOINTMENTS_RESULTS } from "./appointment-results";

export const fetchDiseaseInfoOfUser = async (userId: string, token: string) => {
  const appointmentInfoRes = await client.query<
    getAppointmentInfoUser,
    getAppointmentInfoUserVariables
  >({
    query: GET_APPOINTMENTS_INFO,
    context: {
      headers: {
        Authorization: token,
      },
    },
    variables: { userId },
  });
  const sortedAppointmentsInfo = sortAppointmentsInfoBySessionId(
    appointmentInfoRes.data
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

  try {
    const { getActiveSessionByUserId } = (
      await client
        .query({
          query: GET_ACTIVE_SESSION_PATIENT,
          variables: {
            userId,
          },
        })
        .then((res) => res)
    )?.data;
    activeSession = getActiveSessionByUserId;
  } catch (error) {}

  return {
    activeSession,
    appointmentsInfo: sortedAppointmentsInfo,
    appointmentResults: getAppointmentResultsByUser,
  };
};
