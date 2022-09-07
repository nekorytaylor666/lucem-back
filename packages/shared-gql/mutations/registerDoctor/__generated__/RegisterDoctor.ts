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
// GraphQL mutation operation: RegisterDoctor
// ====================================================

export interface RegisterDoctor_registerDoctor_doctor {
  __typename: "Doctor";
  _id: string;
  description: string | null;
}

export interface RegisterDoctor_registerDoctor {
  __typename: "DoctorTokenGraph";
  doctor: RegisterDoctor_registerDoctor_doctor;
}

export interface RegisterDoctor {
  registerDoctor: RegisterDoctor_registerDoctor;
}

export interface RegisterDoctorVariables {
  fullName: string;
  email: string;
  description: string;
  acceptableAgeGroup: AcceptableAgeGroup;
  dateOfBirth: any;
  avatar?: any | null;
  experience?: ExperienceInput[] | null;
  languages: LanguageInput[];
  password: string;
  phoneNumber: string;
  startingExperienceDate: any;
  workTimes?: WorkTimeInput[] | null;
  cabinet: string;
  specializationIds?: string[] | null;
}
