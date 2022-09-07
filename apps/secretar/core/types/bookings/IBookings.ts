import { DoctorEntity } from "../doctors/IDoctors";
import { PatientEntity } from "../patient/IPatient";

export enum BookingProgress {
    CANCELED = "Canceled",
    DONE = "Done",
    ON = "On",
    UPCOMING = "Upcoming",
}

export interface Booking {
    _id: string;
    doctor: DoctorEntity;
    endDate: string;
    progress: BookingProgress;
    service: Service;
    startDate: string;
    user: PatientEntity;
}

export interface Service {
    _id: string;
    description: string;
    doctors: DoctorEntity[];
    name: string;
    price: number;
}
