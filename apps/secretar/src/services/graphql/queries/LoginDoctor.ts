import { gql } from "@apollo/client";

export const LOGIN_SECRETARY = gql`
    query LoginSecretary($email: String!, $password: String!) {
        loginAsSecretary(email: $email, password: $password) {
            token
            secretary {
                _id
            }
        }
    }
`;
