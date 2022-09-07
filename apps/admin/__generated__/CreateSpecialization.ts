/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ColorCodeGradientInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSpecialization
// ====================================================

export interface CreateSpecialization_createSpecialization {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface CreateSpecialization {
  createSpecialization: CreateSpecialization_createSpecialization;
}

export interface CreateSpecializationVariables {
  colorCodeGradient?: ColorCodeGradientInput | null;
  description: string;
  image?: any | null;
  name: string;
}
