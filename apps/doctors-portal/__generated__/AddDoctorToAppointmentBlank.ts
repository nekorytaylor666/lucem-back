/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDoctorToAppointmentBlank
// ====================================================

export interface AddDoctorToAppointmentBlank_addDoctorToAppointmentBlank {
    __typename: "AppointmentBlankGraph";
    _id: string;
}

export interface AddDoctorToAppointmentBlank {
    addDoctorToAppointmentBlank: AddDoctorToAppointmentBlank_addDoctorToAppointmentBlank;
}

export interface AddDoctorToAppointmentBlankVariables {
    appointmentBlankId: string;
    doctorId: string;
}
