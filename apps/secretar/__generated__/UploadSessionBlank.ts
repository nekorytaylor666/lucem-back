/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateComplaint, CreateDiagnose, CreateInspections, CreateAppointmentResults } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UploadSessionBlank
// ====================================================

export interface UploadSessionBlank_createSessionBlank {
  __typename: "AppointmentBlankGraph";
}

export interface UploadSessionBlank {
  createSessionBlank: UploadSessionBlank_createSessionBlank;
}

export interface UploadSessionBlankVariables {
  complaint: CreateComplaint;
  diagnose: CreateDiagnose;
  inspections: CreateInspections;
  sessionId: string;
  appointmentResults?: CreateAppointmentResults | null;
}
