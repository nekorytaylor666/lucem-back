import { gql } from "@apollo/client";

export const GET_USER_BY_PHONE_NUMBER = gql`
    query GetUserByPhoneNumber($phoneNumber: String!) {
        getUserByPhoneNumber(phoneNumber: $phoneNumber) {
            _id
            fullName
            phoneNumber
            email
            token
        }
    }
`;
