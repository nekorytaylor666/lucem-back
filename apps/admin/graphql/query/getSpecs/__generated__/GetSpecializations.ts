/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSpecializations
// ====================================================

export interface GetSpecializations_getSpecializations_services {
  __typename: "Service";
  name: string;
  price: number;
}

export interface GetSpecializations_getSpecializations {
  __typename: "Specialization";
  name: string;
  _id: string;
  services: GetSpecializations_getSpecializations_services[];
}

export interface GetSpecializations {
  getSpecializations: GetSpecializations_getSpecializations[];
}
