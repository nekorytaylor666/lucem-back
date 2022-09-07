/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: CreateSessionBlank
// ====================================================

export interface CreateSessionBlank_createSessionBlank {
  __typename: "Complain" | "Diagnose" | "Inspections";
}

export interface CreateSessionBlank {
  createSessionBlank: CreateSessionBlank_createSessionBlank[];
}

export interface CreateSessionBlankVariables {

  inspections: string[];
  sessionId: string;
}
