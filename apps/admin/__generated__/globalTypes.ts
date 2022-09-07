/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AcceptableAgeGroup {
  Adult = "ADULT",
  Both = "BOTH",
  Child = "CHILD",
}

export enum AllowedDoctorLanguageTypes {
  Basic = "Basic",
  First = "First",
  Fluently = "Fluently",
}

export enum AllowedDoctorLanguages {
  English = "English",
  German = "German",
  Kazakh = "Kazakh",
  Russian = "Russian",
  Turkish = "Turkish",
}

export enum AllowedExperienceAndEducationTypes {
  Education = "Education",
  Experience = "Experience",
}

export enum AllowedGraphTypes {
  Money = "Money",
  people = "people",
}

export enum AllowedPeriodsOfTime {
  Month = "Month",
  Year = "Year",
}

export interface ColorCodeGradientInput {
  finish: string;
  start: string;
}

export interface ExperienceDataInput {
  __typename: string;
  institutionName: string;
  specialty: string;
  years: number[];
}

export interface ExperienceInput {
  data: ExperienceDataInput[];
  name: AllowedExperienceAndEducationTypes;
}

export interface LanguageInput {
  language: AllowedDoctorLanguages;
  type: AllowedDoctorLanguageTypes;
}

export interface WorkTimeInput {
  endTime: any;
  startTime: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
