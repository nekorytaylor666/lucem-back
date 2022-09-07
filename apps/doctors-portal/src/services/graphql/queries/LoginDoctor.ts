import { gql } from "@apollo/client";

export const LOGIN_DOCTOR = gql`
    query LoginDoctor($email: String!, $password: String!) {
        loginDoctor(email: $email, password: $password) {
            doctor {
                _id
            }
            token
        }
    }
`;
