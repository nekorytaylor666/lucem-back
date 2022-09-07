/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAppointmentInfoUser
// ====================================================

export interface getAppointmentInfoUser_getComplaintsOfUser_session {
  __typename: "Session";
  _id: string;
  startDate: string;
  count: number;
}

export interface getAppointmentInfoUser_getComplaintsOfUser_doctor {
  __typename: "Doctor";
  fullName: string;
}

export interface getAppointmentInfoUser_getComplaintsOfUser {
  __typename: "Complain";
  _id: string;
  complaint: string;
  reason: string;
  sicknessTimeDuration: string;
  session: getAppointmentInfoUser_getComplaintsOfUser_session | null;
  doctor: getAppointmentInfoUser_getComplaintsOfUser_doctor | null;
}

export interface getAppointmentInfoUser_getDiagnoseOfUser_session {
  __typename: "Session";
  _id: string;
  startDate: string;
  count: number;
}

export interface getAppointmentInfoUser_getDiagnoseOfUser_doctor {
  __typename: "Doctor";
  fullName: string;
}

export interface getAppointmentInfoUser_getDiagnoseOfUser {
  __typename: "Diagnose";
  _id: string;
  diagnose: string;
  natureOfTheDesease: string;
  preliminary: boolean;
  session: getAppointmentInfoUser_getDiagnoseOfUser_session | null;
  doctor: getAppointmentInfoUser_getDiagnoseOfUser_doctor | null;
}

export interface getAppointmentInfoUser_getInspectionsOfUser_session {
  __typename: "Session";
  _id: string;
  startDate: string;
  count: number;
}

export interface getAppointmentInfoUser_getInspectionsOfUser_doctor {
  __typename: "Doctor";
  fullName: string;
}

export interface getAppointmentInfoUser_getInspectionsOfUser {
  __typename: "Inspections";
  _id: string;
  inspections: string[];
  session: getAppointmentInfoUser_getInspectionsOfUser_session | null;
  doctor: getAppointmentInfoUser_getInspectionsOfUser_doctor | null;
}

export interface getAppointmentInfoUser {
  getComplaintsOfUser: getAppointmentInfoUser_getComplaintsOfUser[];
  getDiagnoseOfUser: getAppointmentInfoUser_getDiagnoseOfUser[];
  getInspectionsOfUser: getAppointmentInfoUser_getInspectionsOfUser[];
}

export interface getAppointmentInfoUserVariables {
  userId: string;
}
