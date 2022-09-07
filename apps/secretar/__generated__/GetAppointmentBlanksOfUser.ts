/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAppointmentBlanksOfUser
// ====================================================

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_doctor_avatar {
  __typename: "PhotoURL";
  m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_doctor {
  __typename: "Doctor";
  fullName: string;
  avatar: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_doctor_avatar | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults {
  __typename: "AppointmentResults";
  _id: string;
  description: string;
  doctor: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_doctor | null;
  photoURL: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults_photoURL | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint {
  __typename: "Complain";
  complaint: string;
  sicknessTimeDuration: string;
  reason: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose {
  __typename: "Diagnose";
  diagnose: string;
  deseaseDBCode: string | null;
  natureOfTheDesease: string;
  preliminary: boolean;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_images {
  __typename: "PhotoURL";
  m: string | null;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections {
  __typename: "Inspections";
  description: string | null;
  images: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections_images[] | null;
  _id: string;
}

export interface GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser {
  __typename: "AppointmentBlankGraph";
  _id: string;
  appointmentResults: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_appointmentResults[] | null;
  complaint: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_complaint | null;
  diagnose: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_diagnose | null;
  inspections: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser_inspections[] | null;
}

export interface GetAppointmentBlanksOfUser {
  getAppointmentBlanksOfUser: GetAppointmentBlanksOfUser_getAppointmentBlanksOfUser[];
}

export interface GetAppointmentBlanksOfUserVariables {
  userId: string;
}
