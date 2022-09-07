import { gql } from "@apollo/client";

export const EDIT_SESSION_BLANK = gql`
    mutation EditSessionBlank(
        $complaint: EditComplaintInput!
        $diagnose: EditDiagnoseInput!
        $inspections: CreateInspections!
        $sessionId: String!
        $appointmentResults: EditAppointmentResultsInput
        $appointmentBlankId: String!
    ) {
        editSessionBlank(
            complaints: $complaint
            diagnose: $diagnose
            inspections: $inspections
            sessionId: $sessionId
            appointmentResults: $appointmentResults
            appointmentBlankId: $appointmentBlankId
        ) {
            __typename
        }
    }
`;
