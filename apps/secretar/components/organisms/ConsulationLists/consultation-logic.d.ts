import { DoctorEntity } from "@core/types/doctors/IDoctors";
import { Session } from "@core/types/session/ISession";

export interface Diagnosis {
    _id: string;
    diagnose: string;
    natureOfTheDesease: string;
    preliminary: boolean;
}

export interface Complaint {
    _id: string;
    complaint: string;
    reason: string;
    sicknessTimeDuration: string;
}
export interface Inspections {
    _id: string;
    inspections: string[];
}

export interface AppointmentDiagnosis {
    _id: string;
    diagnose: string;
    natureOfTheDesease: string;
    preliminary: boolean;
    session: Session;
}

export interface AppointmentComplaint {
    _id: string;
    complaint: string;
    reason: string;
    sicknessTimeDuration: string;
    session: Session;
    doctor: {
        fullName: string;
    };
}
export interface AppointmentInspections {
    _id: string;
    inspections: string[];
    session: Session;
}

export interface AppointmentInfoResponse {
    getComplaintsOfUser: AppointmentComplaint[];
    getDiagnoseOfUser: AppointmentDiagnosis[];
    getInspectionsOfUser: AppointmentInspections[];
}

export interface AppointmentInfo {
    diagnosis: AppointmentDiagnosis;
    complaint: AppointmentComplaint;
    inspections: AppointmentInspections;
    sessionId: string;
    date: string;
    doctorFullName: string;
}
