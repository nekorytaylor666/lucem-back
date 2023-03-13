/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditSpecializationWithoutFile
// ====================================================

export interface EditSpecializationWithoutFile_editSpecializationWithoutFile {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface EditSpecializationWithoutFile {
  editSpecializationWithoutFile: EditSpecializationWithoutFile_editSpecializationWithoutFile;
}

export interface EditSpecializationWithoutFileVariables {
  colorCode: string;
  description: string;
  specializationId: string;
  name: string;
}
