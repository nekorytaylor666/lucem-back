/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: loginAdmin
// ====================================================

export interface loginAdmin_loginAdmin {
  __typename: "Admin";
  token: string | null;
}

export interface loginAdmin {
  loginAdmin: loginAdmin_loginAdmin;
}

export interface loginAdminVariables {
  email: string;
  password: string;
}
