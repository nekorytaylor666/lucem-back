/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginUser
// ====================================================

export interface LoginUser_loginUser {
  __typename: "User";
  token: string | null;
  _id: string;
}

export interface LoginUser {
  loginUser: LoginUser_loginUser;
}

export interface LoginUserVariables {
  email: string;
  password: string;
}
