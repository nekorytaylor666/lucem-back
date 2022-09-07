import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $dateOfBirth: String!
    $email: String!
    $fullName: String!
    $phoneNumber: String!
  ) {
    registerUser(
      dateOfBirth: $dateOfBirth
      email: $email
      fullName: $fullName
      phoneNumber: $phoneNumber
    ) {
      _id
      token
    }
  }
`;
