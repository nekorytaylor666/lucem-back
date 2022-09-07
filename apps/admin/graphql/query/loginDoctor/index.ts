import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
    query loginAdmin($email: String!, $password: String!) {
        loginAdmin(email: $email, password: $password) {
            token
        }
    }
`;
