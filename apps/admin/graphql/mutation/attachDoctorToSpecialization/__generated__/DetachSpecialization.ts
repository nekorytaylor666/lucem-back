/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DetachSpecialization
// ====================================================

export interface DetachSpecialization_dettachDoctorFromSpecialization {
  __typename: "Specialization";
  _id: string;
}

export interface DetachSpecialization {
  dettachDoctorFromSpecialization: DetachSpecialization_dettachDoctorFromSpecialization;
}

export interface DetachSpecializationVariables {
  doctorId: string;
  specializationId: string;
}
