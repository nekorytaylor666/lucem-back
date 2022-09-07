import {
    GetAppointmentBlanksOfUser,
    GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser,
} from "@graphqlTypes/GetAppointmentBlanksOfUser";
import {
    UploadSessionBlank,
    UploadSessionBlankVariables,
    UploadSessionBlank_createSessionBlank,
} from "@graphqlTypes/UploadSessionBlank";
import { AppointmentInfo } from "components/organisms/ConsulationLists/consultation-lists.service";
import { EditorState } from "draft-js";

export const sessionInitialValues: Omit<
    UploadSessionBlankVariables,
    "sessionId"
> = {
    diagnose: {
        preliminary: true,
        diagnose: "",
        natureOfTheDesease: "",
        deseaseDBCode: "",
    },
    complaint: {
        complaint: "",
        sicknessTimeDuration: "",
        reason: "",
    },
    inspections: {
        data: [
            {
                description: "",
                images: undefined,
            },
        ],
    },
    appointmentResults: {
        photoURL: undefined,
        description: "",
    },
};

export type SessionInitialValues = typeof sessionInitialValues;

export const appointmentInfoToSessionInitialValues = (
    appointmentInfo: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser,
): SessionInitialValues => {
    const initialValues: SessionInitialValues = {
        diagnose: {
            preliminary: true,
            diagnose: "",
            natureOfTheDesease: "",
            deseaseDBCode: "",
        },
        complaint: {
            complaint: "",
            sicknessTimeDuration: "",
            reason: "",
        },
        inspections: {
            data: [
                {
                    description: "",
                    images: undefined,
                },
            ],
        },
        appointmentResults: {
            photoURL: undefined,
            description: "",
        },
    };
    initialValues.diagnose = {
        preliminary: appointmentInfo.diagnose.preliminary,
        ...appointmentInfo.diagnose,
    };
    initialValues.inspections.data = appointmentInfo.inspections;

    initialValues.complaint = appointmentInfo.complaint;

    initialValues.appointmentResults = appointmentInfo.appointmentResults;

    return initialValues;
};

export type sessionFormInitialType = typeof sessionInitialValues;
