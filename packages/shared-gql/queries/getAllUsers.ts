import { gql } from "@apollo/client/core";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    listUsers {
      fullName
      _id
      phoneNumber
      photoURL {
        m
      }
    }
  }
`;
