/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AcceptableAgeGroup, ExperienceInput, LanguageInput, WorkTimeInput } from "./globalTypes";

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
  acceptableAgeGroup: AcceptableAgeGroup
  // avatar: Upload
  cabinet: String
  dateOfBirth: Date
  description: String
  doctorId: String
  doctorPercentage: Number
  email: String
  experiences: ExperienceInput[]
  fullName: String
  isMan: Boolean
  languages: LanguageInput[]
  password: String
  phoneNumber: String
  specializationIds: String[]
  startingExperienceDate: Date
  workTimes: WorkTimeInput[]
}
