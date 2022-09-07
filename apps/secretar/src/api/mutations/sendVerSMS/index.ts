import { gql } from "@apollo/client";

export const SEND_VER_SMS = gql`
    mutation SendVerSMS($phoneNumber: String!) {
        sendVerSMS(phoneNumber: $phoneNumber)
    }
`;
