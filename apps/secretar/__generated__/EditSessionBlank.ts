/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditComplaintInput, EditDiagnoseInput, CreateInspections, EditAppointmentResultsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditSessionBlank
// ====================================================

export interface EditSessionBlank_editSessionBlank {
  __typename: "AppointmentBlankGraph";
}

export interface EditSessionBlank {
  editSessionBlank: EditSessionBlank_editSessionBlank;
}

export interface EditSessionBlankVariables {
  complaint: EditComplaintInput;
  diagnose: EditDiagnoseInput;
  inspections: CreateInspections;
  sessionId: string;
  appointmentResults?: EditAppointmentResultsInput | null;
  appointmentBlankId: string;
}
