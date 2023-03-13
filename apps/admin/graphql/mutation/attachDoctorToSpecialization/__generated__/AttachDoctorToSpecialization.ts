/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AttachDoctorToSpecialization
// ====================================================

export interface AttachDoctorToSpecialization_attachDoctorToSpecialization {
  __typename: "Specialization";
  _id: string;
}

export interface AttachDoctorToSpecialization {
  attachDoctorToSpecialization: AttachDoctorToSpecialization_attachDoctorToSpecialization;
}

export interface AttachDoctorToSpecializationVariables {
  doctorId: string;
  specializationId: string;
}
