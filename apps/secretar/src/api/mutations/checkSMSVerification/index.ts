import { gql } from "@apollo/client";

export const CHECK_SMS_VERIFICATION = gql`
    mutation CheckSMSVerificationCode($code: String!, $phoneNumber: String!) {
        checkSMSVerificationCode(code: $code, phoneNumber: $phoneNumber) {
            _id
            token
            phoneNumber
        }
    }
`;
