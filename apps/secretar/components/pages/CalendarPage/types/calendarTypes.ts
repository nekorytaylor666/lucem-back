import { PatientEntity } from "@core/types/patient/IPatient";

export interface EventDataDTO {
    title: string;
    startDate: Date;
    patient: PatientEntity;
    bookingId: string;
}
