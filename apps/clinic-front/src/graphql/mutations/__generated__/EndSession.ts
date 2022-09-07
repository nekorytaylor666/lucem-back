/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EndSession
// ====================================================

export interface EndSession_endSession {
  __typename: "Session";
  _id: string;
}

export interface EndSession {
  endSession: EndSession_endSession;
}

export interface EndSessionVariables {
  sessionId: string;
}
