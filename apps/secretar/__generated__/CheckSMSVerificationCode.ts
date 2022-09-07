/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CheckSMSVerificationCode
// ====================================================

export interface CheckSMSVerificationCode_checkSMSVerificationCode {
  __typename: "User";
  _id: string;
  token: string | null;
  phoneNumber: string;
}

export interface CheckSMSVerificationCode {
  checkSMSVerificationCode: CheckSMSVerificationCode_checkSMSVerificationCode;
}

export interface CheckSMSVerificationCodeVariables {
  code: string;
  phoneNumber: string;
}
