/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServicesByDoctorId
// ====================================================

export interface GetServicesByDoctorId_getServicesByDoctorId {
  __typename: "Service";
  _id: string;
  name: string;
}

export interface GetServicesByDoctorId {
  getServicesByDoctorId: GetServicesByDoctorId_getServicesByDoctorId[];
}

export interface GetServicesByDoctorIdVariables {
  doctorId: string;
}
