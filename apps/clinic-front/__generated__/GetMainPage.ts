/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMainPage
// ====================================================

export interface GetMainPage_getSpecializations_colorCodeGradient {
  __typename: "ColorCodeGradientGraph";
  start: string;
  finish: string;
}

export interface GetMainPage_getSpecializations_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetMainPage_getSpecializations {
  __typename: "Specialization";
  _id: string;
  name: string;
  description: string;
  colorCodeGradient: GetMainPage_getSpecializations_colorCodeGradient | null;
  photoURL: GetMainPage_getSpecializations_photoURL | null;
}

export interface GetMainPage_getAllDoctors_specializations {
  __typename: "Specialization";
  name: string;
}

export interface GetMainPage_getAllDoctors_avatar {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetMainPage_getAllDoctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  description: string | null;
  specializations: GetMainPage_getAllDoctors_specializations[] | null;
  rating: number | null;
  acceptableAgeGroup: string | null;
  avatar: GetMainPage_getAllDoctors_avatar | null;
}

export interface GetMainPage {
  getSpecializations: GetMainPage_getSpecializations[];
  getAllDoctors: GetMainPage_getAllDoctors[];
}
