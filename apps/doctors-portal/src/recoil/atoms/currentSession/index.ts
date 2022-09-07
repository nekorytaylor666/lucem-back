import { atom } from "recoil";
import { ConsultSessionEntity } from "@core/types/session/ISession";
import { PatientEntity } from "../../../../core/types/patient/IPatient";

const currentSessionFormState = atom<ConsultSessionEntity>({
    key: "currentSessionFormState",
    default: {
        generalReview: {
            reviews: [],
        },
        illnessReason: {
            issues: "",
            illnesTimeLength: {
                amount: "",
                period: "Дней",
            },
            reason: "",
        },
        diagnoses: {
            diagnoseType: "",
            mkb: "",
            fullIllnessDescription: "",
            illnessCharacteristics: "",
        },
        researchResult: {
            description: "",
        },
        references: {},
        curingPlan: {},
    },
});

export interface SessionDetails {
    title: string;
    startDate: Date;
    patient: PatientEntity;
    bookingId: string;
}

export interface CurrentSessionsStateType {
    sessions: SessionDetails[];
}

export const currentSessionsState = atom<CurrentSessionsStateType>({
    key: "currentSessions",
    default: { sessions: [] },
});
export default currentSessionFormState;
