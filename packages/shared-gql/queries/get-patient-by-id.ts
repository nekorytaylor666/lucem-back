import { gql } from "@apollo/client";

export const PATIENT_BY_ID = gql`
  query GetUserById($userId: String!) {
    getUserByID(userId: $userId) {
      fullName
      phoneNumber
      dateOfBirth
      phoneNumber
      email
    }
  }
`;
