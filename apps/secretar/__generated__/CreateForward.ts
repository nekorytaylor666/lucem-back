/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateForward
// ====================================================

export interface CreateForward_createForward {
  __typename: "Forwards";
  _id: string;
}

export interface CreateForward {
  createForward: CreateForward_createForward;
}

export interface CreateForwardVariables {
  serviceId: string[];
  userId: string;
}
