import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation RegisterUser(
        $dateOfBirth: String!
        $email: String!
        $fullName: String!
        $phoneNumber: String!
        $password: String!
    ) {
        registerUser(
            dateOfBirth: $dateOfBirth
            email: $email
            fullName: $fullName
            phoneNumber: $phoneNumber
            password: $password
        ) {
            _id
            token
        }
    }
`;
