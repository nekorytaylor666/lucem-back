/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSpecializations
// ====================================================

export interface GetSpecializations_getSpecializations_colorCodeGradient {
  __typename: "ColorCodeGradientGraph";
  start: string | null;
  finish: string | null;
}

export interface GetSpecializations_getSpecializations_services {
  __typename: "Service";
  _id: string;
  name: string;
}

export interface GetSpecializations_getSpecializations_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetSpecializations_getSpecializations {
  __typename: "Specialization";
  _id: string;
  name: string;
  colorCodeGradient: GetSpecializations_getSpecializations_colorCodeGradient | null;
  services: GetSpecializations_getSpecializations_services[];
  photoURL: GetSpecializations_getSpecializations_photoURL | null;
  description: string;
}

export interface GetSpecializations {
  getSpecializations: GetSpecializations_getSpecializations[];
}
