import { gql } from "@apollo/client";

export const EDIT_SESSION_BLANK = gql`
    mutation EditSessionBlank(
        $complaints: EditComplaintInput!
        $diagnose: EditDiagnoseInput!
        $inspections: [String!]!
        $sessionId: String!
    ) {
        editSessionBlank(
            complaints: $complaints
            diagnose: $diagnose
            inspections: $inspections
            sessionId: $sessionId
        ) {
            __typename
        }
    }
`;
