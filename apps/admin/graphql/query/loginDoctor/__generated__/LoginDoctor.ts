/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginDoctor
// ====================================================

export interface LoginDoctor_loginDoctor_doctor {
  __typename: "Doctor";
  _id: string;
  fullName: string;
}

export interface LoginDoctor_loginDoctor {
  __typename: "DoctorTokenGraph";
  token: string;
  doctor: LoginDoctor_loginDoctor_doctor;
}

export interface LoginDoctor {
  loginDoctor: LoginDoctor_loginDoctor;
}

export interface LoginDoctorVariables {
  email: string;
  password: string;
}
