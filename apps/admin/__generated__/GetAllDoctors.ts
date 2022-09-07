/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllDoctors
// ====================================================

export interface GetAllDoctors_getAllDoctors_specializations {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface GetAllDoctors_getAllDoctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  specializations: GetAllDoctors_getAllDoctors_specializations[] | null;
}

export interface GetAllDoctors {
  getAllDoctors: GetAllDoctors_getAllDoctors[];
}
