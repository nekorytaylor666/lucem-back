/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServicesByDoctorIds
// ====================================================

export interface GetServicesByDoctorIds_getServicesByDoctorIds {
  __typename: "Service";
  _id: string;
  description: string;
  name: string;
  price: number;
}

export interface GetServicesByDoctorIds {
  getServicesByDoctorIds: GetServicesByDoctorIds_getServicesByDoctorIds[];
}

export interface GetServicesByDoctorIdsVariables {
  doctorId: string[];
  page: number;
}
