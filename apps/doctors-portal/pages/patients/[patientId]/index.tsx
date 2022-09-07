import { Container, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import {
    CalWeekdayGraph,
    GetAppointmentBlanksOfUserDocument,
    useEditSessionBlankMutation,
    useGetActiveSessionByUserIdQuery,
    useGetAppointmentBlanksOfUserQuery,
    useGetUserByIdQuery,
    useUploadSessionBlankMutation,
} from "@lucem/shared-gql";
import {
    CreateAppointmentBlankFormSchema,
    EditAppointmentBlankFormSchema,
} from "@lucem/ui/components/organisms/SessionModal/shared/initialValues";
import PatientPage from "@lucem/ui/pages/PatientPage";
import { GET_APPOINTMENT_BLANKS_OF_USER } from "@src/api/queries/getAppointmentResults";
import { getDoctorTokens } from "@src/utils/getToken";
import _ from "lodash";
import { useRouter } from "next/router";

import React from "react";

const PatientPageContainer = () => {
    const router = useRouter();
    const { token, doctorId } = getDoctorTokens();
    const toast = useToast();
    const patientId = router.query.patientId as string;

    const { loading: userByIdloading, data: getUserByIdRes } =
        useGetUserByIdQuery({
            variables: {
                userId: patientId,
            },
        });
    const { loading: activeSessionLoading, data: getActiveSessionRes } =
        useGetActiveSessionByUserIdQuery({
            variables: {
                userId: patientId,
            },
        });
    const {
        loading: appointmentBlanksLoading,
        data: appointmentBlanksRes,
        refetch,
    } = useGetAppointmentBlanksOfUserQuery({
        variables: {
            userId: patientId,
        },
        context: {
            headers: { Authorization: token },
        },
    });
    const [uploadSessionBlank, { loading }] = useUploadSessionBlankMutation({
        context: {
            headers: { Authorization: token },
        },
        refetchQueries: [{ query: GET_APPOINTMENT_BLANKS_OF_USER }],
    });
    const [editSessionBlank, { loading: editLoaing }] =
        useEditSessionBlankMutation({
            context: {
                headers: { Authorization: token },
            },
            refetchQueries: [{ query: GET_APPOINTMENT_BLANKS_OF_USER }],
        });

    if (userByIdloading || activeSessionLoading) {
        return (
            <Container>
                <Center>
                    <Spinner></Spinner>
                </Center>
            </Container>
        );
    }
    const onCreateAppointmentBlank = async (
        values: CreateAppointmentBlankFormSchema,
    ) => {
        const { complaint, diagnose, inspections, treatmentPlan } = values;
        diagnose.preliminary = diagnose.preliminary ? true : false;
        const { data, errors } = await uploadSessionBlank({
            variables: {
                complaint,
                diagnose,
                inspections,
                sessionId: activeSession._id,
                treatmentPlan,
            },
            onCompleted() {
                toast({
                    status: "success",
                    title: "Создание приема завершено!",
                });
            },
        });
        refetch();
    };
    const onEditAppointmentBlank = async (
        values: EditAppointmentBlankFormSchema,
    ) => {
        const payload = _.removeDeepByKey(values, "doctor");
        payload.inspections.data = values.inspections.data.map((el) => {
            let result = _.omit(el, ["doctor", "doctorId", "_id"]);

            if (el?.images[0]?.m) {
                result = _.omit(result, "images");
                result.photoURL = el.images[0];
                return result;
            }
            el.photoURL = [];
            return el;
        });
        const copy = { ...payload };
        const { complaint, diagnose, inspections } = copy;
        diagnose.preliminary = diagnose.preliminary ? true : false;
        await editSessionBlank({
            variables: {
                complaint,
                diagnose,
                inspections,
                appointmentBlankId: values.appointmentBlankId,
            },
            onCompleted() {
                toast({
                    status: "success",
                    title: "Редактирование завершено!",
                });
            },
            refetchQueries: [{ query: GET_APPOINTMENT_BLANKS_OF_USER }],
        });
        refetch();
    };

    const patient = getUserByIdRes.getUserByID;
    const activeSession = getActiveSessionRes?.getActiveSessionByUserId;
    const appointmentBlanks = appointmentBlanksRes?.getAppointmentBlanksOfUser;
    return (
        <PatientPage
            appointmentBlanksLoading={appointmentBlanksLoading}
            appointmentBlanks={appointmentBlanks ?? []}
            activeSession={activeSession}
            patient={patient}
            onCreateAppointmentBlank={onCreateAppointmentBlank}
            onEditAppointmentBlank={onEditAppointmentBlank}
        ></PatientPage>
    );
};

export default PatientPageContainer;
