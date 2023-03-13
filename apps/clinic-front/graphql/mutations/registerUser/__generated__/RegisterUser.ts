/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_registerUser {
  __typename: "User";
  _id: string;
  token: string | null;
}

export interface RegisterUser {
  registerUser: RegisterUser_registerUser;
}

export interface RegisterUserVariables {
  dateOfBirth: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
}
