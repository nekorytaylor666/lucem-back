/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditSpecializationWithFile
// ====================================================

export interface EditSpecializationWithFile_editSpecializationWithFile {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface EditSpecializationWithFile {
  editSpecializationWithFile: EditSpecializationWithFile_editSpecializationWithFile;
}

export interface EditSpecializationWithFileVariables {
  image: any;
  specializationId: string;
}
