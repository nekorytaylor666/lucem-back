import AppointmentSessionModal from "components/organisms/SessionModal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import gql from "graphql-tag";
import client from "src/apollo/apollo-client";
import {
    endSessionMutation,
    UPLOAD_SESSION_BLANK,
} from "@src/api/mutations/session";
import { sessionAdapterFormStateToPayload } from "components/organisms/SessionModal/shared/adapter";
import PatientInfo from "components/organisms/ConsulationLists/patient-info";
import AppointmentLists from "components/organisms/ConsulationLists/consultation-lists";
import { getDoctorTokens } from "@src/utils/getToken";
import { PATIENT_BY_ID } from "@src/api/queries/get-patient-by-id";
import EditAppointmentSessionModal from "components/organisms/SessionModal/editSessionModal";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_SESSION_BLANK } from "@src/api/mutations/edit-session-blank";
import {
    EditSessionBlank,
    EditSessionBlankVariables,
} from "@graphqlTypes/EditSessionBlank";
import { GET_APPOINTMENT_BLANKS_OF_USER } from "@src/api/queries/getAppointmentResults";
import {
    GetAppointmentBlanksOfUser,
    GetAppointmentBlanksOfUserVariables,
} from "@graphqlTypes/GetAppointmentBlanksOfUser";
import { GET_ACTIVE_SESSION_PATIENT } from "@src/api/queries/getActiveSession";
import {
    GetActiveSession,
    GetActiveSessionVariables,
} from "@graphqlTypes/GetActiveSession";
import {
    UploadSessionBlank,
    UploadSessionBlankVariables,
} from "@graphqlTypes/UploadSessionBlank";

const PatientPage = ({ patient }: any) => {
    const router = useRouter();
    const { token } = getDoctorTokens();
    const { patientId } = router.query;
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [currentEditAppointment, setCurrentEditAppointment] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editSessionBlankMutation] = useMutation<
        EditSessionBlank,
        EditSessionBlankVariables
    >(EDIT_SESSION_BLANK, {
        context: {
            headers: { Authorization: token },
        },
    });

    const { data: activeSessionData, loading: sessionLoading } = useQuery<
        GetActiveSession,
        GetActiveSessionVariables
    >(GET_ACTIVE_SESSION_PATIENT, {
        variables: {
            userId: patientId as string,
        },
        context: {
            headers: { Authorization: token },
        },
    });
    const activeSession = activeSessionData?.getActiveSessionByUserId;

    const {
        data,
        loading: patientInfoLoading,
        error,
    } = useQuery<
        GetAppointmentBlanksOfUser,
        GetAppointmentBlanksOfUserVariables
    >(GET_APPOINTMENT_BLANKS_OF_USER, {
        variables: {
            userId: patientId as string,
        },
        context: {
            headers: { Authorization: token },
        },
    });

    const [uploadSessionBlankMutation] = useMutation<
        UploadSessionBlank,
        UploadSessionBlankVariables
    >(UPLOAD_SESSION_BLANK);
    const appointmentInfos = data?.getAppointmentBlanksOfUser;

    const onStartSession = async () => {
        setShowSessionModal(true);
    };

    const addSessionBlank = async (data: any) => {
        setShowSessionModal(false);
    };
    const editSessionBlank = async (data: any) => {
        setShowSessionModal(false);
        const sessionForm = sessionAdapterFormStateToPayload(data);
        await editSessionBlankMutation({
            variables: {
                ...sessionForm,
                appointmentBlankId: currentEditAppointment?._id,
                sessionId: currentEditAppointment.sessionId,
            },
            context: {
                headers: {
                    Authorization: token,
                },
            },
        });
        alert("Отредактировано");
    };
    return (
        <div>
            <div className="text-sm breadcrumbs text-base-300">
                <ul>
                    <li>
                        <a>Все пациенты</a>
                    </li>
                    <li>
                        <a>{patient?.fullName}</a>
                    </li>
                </ul>
            </div>

            <div className="flex items-center justify-between">
                <h1 className=" text-4xl font-bold mb-2">
                    {patient?.fullName}
                </h1>
                <div className="flex items-center">
                    <button
                        onClick={onStartSession}
                        className="btn btn-primary btn-sm px-6 font-normal capitalize"
                    >
                        Создать новую сессию
                    </button>
                </div>
            </div>
            <div className="w-full border-b-2 border-base-200 mb-4"></div>
            <PatientInfo patient={patient} />
            <div className="mt-4">
                {patientInfoLoading && (
                    <div className="w-full h-xxl flex items-center justify-center">
                        Loading...
                    </div>
                )}
                {!patientInfoLoading && (
                    <AppointmentLists
                        onAppointmentClick={(appointmentInfo) => {
                            setCurrentEditAppointment(appointmentInfo);
                            setEditModalOpen(true);
                        }}
                        appointments={appointmentInfos}
                    ></AppointmentLists>
                )}
            </div>
            <AppointmentSessionModal
                patient={patient}
                active={showSessionModal}
                onClose={() => setShowSessionModal(false)}
                onComplete={addSessionBlank}
            ></AppointmentSessionModal>
            {currentEditAppointment && editModalOpen && (
                <EditAppointmentSessionModal
                    active={true}
                    onClose={() => setEditModalOpen(false)}
                    onComplete={editSessionBlank}
                    session={currentEditAppointment}
                    patient={patient}
                ></EditAppointmentSessionModal>
            )}
        </div>
    );
};

export async function getStaticPaths() {
    const PATIENTS_LIST = gql`
        query {
            listUsers {
                fullName
                _id
                photoURL {
                    m
                }
            }
        }
    `;
    const { data } = await client.query({
        query: PATIENTS_LIST,
    });
    const patients = data?.listUsers;
    const paths = patients.map((patient: any) => ({
        params: { patientId: patient._id, route: "home" },
    }));

    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: any) {
    const { patientId } = params;

    const { getUserByID } = (
        await client.query({
            query: PATIENT_BY_ID,
            variables: {
                userId: patientId,
            },
        })
    ).data;

    return {
        props: {
            patient: getUserByID,
        },
        revalidate: 10,
    };
}

export default PatientPage;
