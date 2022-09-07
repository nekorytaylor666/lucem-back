/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllDoctorsQuery
// ====================================================

export interface GetAllDoctorsQuery_getAllDoctors_avatar {
  __typename: "PhotoURL";
  m: string | null;
}

export interface GetAllDoctorsQuery_getAllDoctors_specializations {
  __typename: "Specialization";
  name: string;
  _id: string;
}

export interface GetAllDoctorsQuery_getAllDoctors {
  __typename: "Doctor";
  _id: string;
  acceptableAgeGroup: string | null;
  avatar: GetAllDoctorsQuery_getAllDoctors_avatar | null;
  description: string | null;
  email: string;
  fullName: string;
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  specializations: GetAllDoctorsQuery_getAllDoctors_specializations[] | null;
}

export interface GetAllDoctorsQuery {
  getAllDoctors: GetAllDoctorsQuery_getAllDoctors[];
}
