/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  AllowedExperienceAndEducationTypes,
  AllowedDoctorLanguages,
  AllowedDoctorLanguageTypes,
} from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDoctorByID
// ====================================================

export interface GetDoctorByID_getDoctorByID_avatar {
  __typename: "PhotoURL";
  m: string | null;
}

export interface GetDoctorByID_getDoctorByID_deseases {
  __typename: "Desease";
  _id: string;
}

export interface GetDoctorByID_getDoctorByID_experiences_data {
  __typename: "ExperienceAndEducationData";
  institutionName: string;
  years: number[];
  specialty: string;
}

export interface GetDoctorByID_getDoctorByID_experiences {
  __typename: "ExperienceAndEducation";
  data: GetDoctorByID_getDoctorByID_experiences_data[] | null;
  name: AllowedExperienceAndEducationTypes;
}

export interface GetDoctorByID_getDoctorByID_languages {
  __typename: "LanguageGraph";
  language: AllowedDoctorLanguages;
  type: AllowedDoctorLanguageTypes;
}

export interface GetDoctorByID_getDoctorByID_specializations {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface GetDoctorByID_getDoctorByID_workTimes {
  __typename: "WorkTime";
  endTime: any;
  startTime: any;
}

export interface GetDoctorByID_getDoctorByID {
  __typename: "Doctor";
  _id: string;
  acceptableAgeGroup: string | null;
  avatar: GetDoctorByID_getDoctorByID_avatar | null;
  cabinet: string | null;
  description: string | null;
  deseases: GetDoctorByID_getDoctorByID_deseases[] | null;
  email: string;
  experiences: GetDoctorByID_getDoctorByID_experiences[] | null;
  fullName: string;
  languages: GetDoctorByID_getDoctorByID_languages[];
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  specializations: GetDoctorByID_getDoctorByID_specializations[] | null;
  workTimes: GetDoctorByID_getDoctorByID_workTimes[] | null;
}

export interface GetDoctorByID {
  getDoctorByID: GetDoctorByID_getDoctorByID;
}

export interface GetDoctorByIDVariables {
  id: string;
}
