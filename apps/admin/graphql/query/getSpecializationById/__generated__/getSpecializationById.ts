/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSpecializationById
// ====================================================

export interface getSpecializationById_getSpecializationById_services {
  __typename: "Service";
  _id: string;
  description: string;
  name: string;
  price: number;
  durationInMinutes: number | null;
}

export interface getSpecializationById_getSpecializationById {
  __typename: "Specialization";
  name: string;
  description: string;
  services: getSpecializationById_getSpecializationById_services[];
}

export interface getSpecializationById {
  getSpecializationById: getSpecializationById_getSpecializationById;
}

export interface getSpecializationByIdVariables {
  specializationId: string;
}
