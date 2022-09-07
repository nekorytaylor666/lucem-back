/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServicesBySpecializationId
// ====================================================

export interface GetServicesBySpecializationId_getServicesBySpecializationId {
  __typename: "Service";
  _id: string;
  description: string;
  name: string;
  price: number;
}

export interface GetServicesBySpecializationId {
  getServicesBySpecializationId: GetServicesBySpecializationId_getServicesBySpecializationId[];
}

export interface GetServicesBySpecializationIdVariables {
  specializationId: string;
}
