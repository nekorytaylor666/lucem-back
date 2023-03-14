import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation RegisterUser(
        $email: String!
        $fullName: String!
        $phoneNumber: String!
        $password: String!
    ) {
        registerUser(
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
