import { AppointmentInfo } from "components/organisms/ConsulationLists/consultation-lists.service";

export const sessionInitialValues = {
    generalReview: { reviews: [] },
    curingPlan: {},
    diagnoses: {
        diagnoseType: "",
        fullIllnessDescription: "",
        illnessCharacteristics: "",
        mkb: "",
    },
    illnessReason: {
        illnesTimeLength: {
            amount: "",
            period: "",
        },
        issues: "",
        reason: "",
    },
    researchResult: {
        description: "",
    },
    references: {},
};

export type SessionInitialValues = typeof sessionInitialValues;

export const appointmentInfoToSessionInitialValues = (
    appointmentInfo: AppointmentInfo,
): SessionInitialValues => {
    const initialValues: SessionInitialValues = {};
    initialValues.diagnoses = {
        diagnoseType: appointmentInfo.diagnosis.preliminary
            ? "preview"
            : "final",
        fullIllnessDescription: appointmentInfo.diagnosis.diagnose,
        illnessCharacteristics: appointmentInfo.diagnosis.natureOfTheDesease,
        mkb: "",
    };
    initialValues.generalReview = {
        reviews: [...appointmentInfo.inspection.inspections],
    };
    initialValues.illnessReason = {
        illnesTimeLength: {
            amount: appointmentInfo.complaint.sicknessTimeDuration.split(
                "-",
            )[0],
            period: appointmentInfo.complaint.sicknessTimeDuration.split(
                "-",
            )[1],
        },
        issues: appointmentInfo.complaint.complaint,
        reason: appointmentInfo.complaint.reason,
    };
    initialValues.generalReview.reviews = [
        ...appointmentInfo.inspection.inspections.map((inspection) => ({
            description: inspection,
        })),
    ];
    initialValues.researchResult = {
        description: "test",
    };
    return initialValues;
};

export type sessionFormInitialType = typeof sessionInitialValues;
