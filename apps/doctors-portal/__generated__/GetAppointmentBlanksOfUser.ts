/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAppointmentBlanksOfUser
// ====================================================

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint_doctor_avatar {
    __typename: "PhotoURL";
    m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint_doctor {
    __typename: "Doctor";
    fullName: string;
    avatar: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint_doctor_avatar | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint {
    __typename: "Complain";
    complaint: string;
    sicknessTimeDuration: string;
    reason: string;
    doctor: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint_doctor | null;
    doctorId: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_owners_doctor {
    __typename: "Doctor";
    _id: string;
    fullName: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_owners {
    __typename: "AppointmentBlankOwnersGraph";
    doctor: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_owners_doctor | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose_doctor_avatar {
    __typename: "PhotoURL";
    m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose_doctor {
    __typename: "Doctor";
    fullName: string;
    avatar: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose_doctor_avatar | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose {
    __typename: "Diagnose";
    diagnose: string;
    deseaseDBCode: string | null;
    natureOfTheDesease: string;
    preliminary: boolean;
    doctor: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose_doctor | null;
    doctorId: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_doctor_avatar {
    __typename: "PhotoURL";
    m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_doctor {
    __typename: "Doctor";
    fullName: string;
    avatar: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_doctor_avatar | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_images {
    __typename: "PhotoURL";
    m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections {
    __typename: "Inspections";
    description: string | null;
    doctor: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_doctor | null;
    doctorId: string;
    images:
        | GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_images[]
        | null;
    _id: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser {
    __typename: "AppointmentBlankGraph";
    _id: string;
    complaint: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint | null;
    owners: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_owners[];
    diagnose: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose | null;
    inspections:
        | GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections[]
        | null;
}

export interface GetAppointmentBlanksOfUser {
    getAppointmentBlanksOfUser: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser[];
}

export interface GetAppointmentBlanksOfUserVariables {
    userId: string;
}
