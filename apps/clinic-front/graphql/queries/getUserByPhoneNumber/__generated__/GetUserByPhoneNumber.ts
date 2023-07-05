/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserByPhoneNumber
// ====================================================

export interface GetUserByPhoneNumber_getUserByPhoneNumber {
  __typename: "User";
  _id: string;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  token: string | null;
}

export interface GetUserByPhoneNumber {
  getUserByPhoneNumber: GetUserByPhoneNumber_getUserByPhoneNumber;
}

export interface GetUserByPhoneNumberVariables {
  phoneNumber: string;
}
