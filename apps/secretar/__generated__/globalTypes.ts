/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AllowedGraphTypes {
  Money = "Money",
  people = "people",
}

export enum AllowedPeriodsOfTime {
  Month = "Month",
  Year = "Year",
}

export enum BookingProgress {
  Canceled = "Canceled",
  Done = "Done",
  Ongoing = "Ongoing",
  Upcoming = "Upcoming",
}

export interface CreateAppointmentResults {
  description: string;
  photoURL?: any | null;
}

export interface CreateComplaint {
  complaint: string;
  reason?: string | null;
  sicknessTimeDuration: string;
}

export interface CreateDiagnose {
  deseaseDBCode?: string | null;
  diagnose: string;
  natureOfTheDesease: string;
  preliminary: boolean;
}

export interface CreateInspections {
  data: InspectionsDataInput[];
}

export interface EditAppointmentResultsInput {
  description?: string | null;
  doctorId?: string | null;
  photo?: any | null;
}

export interface EditComplaintInput {
  complaint?: string | null;
  doctorId?: string | null;
  reason?: string | null;
  sicknessTimeDuration?: string | null;
}

export interface EditDiagnoseInput {
  deseaseDBCode?: string | null;
  diagnose?: string | null;
  doctorId?: string | null;
  natureOfTheDesease?: string | null;
  preliminary?: boolean | null;
}

export interface InspectionsDataInput {
  description?: string | null;
  images?: any[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
