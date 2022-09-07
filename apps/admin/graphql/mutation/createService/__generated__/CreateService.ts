/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateService
// ====================================================

export interface CreateService_createService {
  __typename: "Service";
  _id: string;
  name: string;
}

export interface CreateService {
  createService: CreateService_createService;
}

export interface CreateServiceVariables {
  description: string;
  doctorIds?: string[] | null;
  durationInMinutes?: number | null;
  isShown?: boolean | null;
  name: string;
  price: number;
  specializationId: string;
}
