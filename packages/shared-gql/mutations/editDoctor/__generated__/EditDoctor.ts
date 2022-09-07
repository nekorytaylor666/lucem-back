/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  AcceptableAgeGroup,
  ExperienceInput,
  LanguageInput,
  WorkTimeInput,
} from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditDoctor
// ====================================================

export interface EditDoctor_editDoctor {
  __typename: "Doctor";
  _id: string;
}

export interface EditDoctor {
  editDoctor: EditDoctor_editDoctor;
}

export interface EditDoctorVariables {
  doctorId: string;
  fullName?: string | null;
  email?: string | null;
  description?: string | null;
  acceptableAgeGroup?: AcceptableAgeGroup | null;
  dateOfBirth?: any | null;
  avatar?: any | null;
  experiences?: ExperienceInput[] | null;
  languages?: LanguageInput[] | null;
  password?: string | null;
  phoneNumber?: string | null;
  startingExperienceDate?: any | null;
  workTimes?: WorkTimeInput[] | null;
  cabinet?: string | null;
}
