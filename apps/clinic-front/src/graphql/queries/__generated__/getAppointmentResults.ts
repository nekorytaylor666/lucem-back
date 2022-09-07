/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAppointmentResults
// ====================================================

export interface getAppointmentResults_getAppointmentResultsByUser_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface getAppointmentResults_getAppointmentResultsByUser {
  __typename: "AppointmentResults";
  description: string;
  photoURL: getAppointmentResults_getAppointmentResultsByUser_photoURL | null;
}

export interface getAppointmentResults {
  getAppointmentResultsByUser: getAppointmentResults_getAppointmentResultsByUser[];
}

export interface getAppointmentResultsVariables {
  userId: string;
}
