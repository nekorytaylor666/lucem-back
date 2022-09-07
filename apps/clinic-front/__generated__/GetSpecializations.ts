/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSpecializations
// ====================================================

export interface GetSpecializations_getSpecializations_colorCodeGradient {
  __typename: "ColorCodeGradientGraph";
  start: string;
  finish: string;
}

export interface GetSpecializations_getSpecializations_doctors_avatar {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetSpecializations_getSpecializations_doctors_specializations {
  __typename: "Specialization";
  name: string;
}

export interface GetSpecializations_getSpecializations_doctors_workTimes {
  __typename: "WorkTime";
  endTime: any;
  startTime: any;
}

export interface GetSpecializations_getSpecializations_doctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  acceptableAgeGroup: string | null;
  description: string | null;
  email: string;
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  avatar: GetSpecializations_getSpecializations_doctors_avatar | null;
  specializations: GetSpecializations_getSpecializations_doctors_specializations[] | null;
  workTimes: GetSpecializations_getSpecializations_doctors_workTimes[] | null;
}

export interface GetSpecializations_getSpecializations_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetSpecializations_getSpecializations {
  __typename: "Specialization";
  _id: string;
  name: string;
  description: string;
  colorCodeGradient: GetSpecializations_getSpecializations_colorCodeGradient | null;
  doctors: GetSpecializations_getSpecializations_doctors[];
  photoURL: GetSpecializations_getSpecializations_photoURL | null;
}

export interface GetSpecializations {
  getSpecializations: GetSpecializations_getSpecializations[];
}
