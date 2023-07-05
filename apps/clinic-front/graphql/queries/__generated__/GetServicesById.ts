/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServicesById
// ====================================================

export interface GetServicesById_getServiceById {
  __typename: "Service";
  _id: string;
  price: number;
  name: string;
}

export interface GetServicesById {
  getServiceById: GetServicesById_getServiceById;
}

export interface GetServicesByIdVariables {
  serviceId: string;
}
