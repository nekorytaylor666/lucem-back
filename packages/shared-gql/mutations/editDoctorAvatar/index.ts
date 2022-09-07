import { gql } from "@apollo/client";

export const EDIT_DOCTOR_AVATAR = gql`
  mutation EditDoctorAvatar($doctorId: String!, $image: Upload!) {
    editDoctorWithFile(doctorId: $doctorId, image: $image) {
      _id
      avatar {
        m
      }
    }
  }
`;
