/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditDoctorAvatar
// ====================================================

export interface EditDoctorAvatar_editDoctorWithFile_avatar {
  __typename: "PhotoURL";
  m: string | null;
}

export interface EditDoctorAvatar_editDoctorWithFile {
  __typename: "Doctor";
  _id: string;
  avatar: EditDoctorAvatar_editDoctorWithFile_avatar | null;
}

export interface EditDoctorAvatar {
  editDoctorWithFile: EditDoctorAvatar_editDoctorWithFile;
}

export interface EditDoctorAvatarVariables {
  doctorId: string;
  image: any;
}
