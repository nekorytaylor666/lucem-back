/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditService
// ====================================================

export interface EditService_editService {
  __typename: "Service";
  _id: string;
  name: string;
}

export interface EditService {
  editService: EditService_editService;
}

export interface EditServiceVariables {
  description?: string | null;
  doctorIds?: string[] | null;
  durationInMinutes?: number | null;
  isShown?: boolean | null;
  name?: string | null;
  price?: number | null;
  serviceId: string;
  specializationId?: string[] | null;
}
