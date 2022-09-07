import { gql } from "@apollo/client";

export const EDIT_SESSION_BLANK = gql`
    mutation EditSessionBlank(
        $complaint: EditComplaintInput!
        $diagnose: EditDiagnoseInput!
        $inspections: EditInspections!
        $appointmentResults: EditAppointmentResultsInput
        $appointmentBlankId: String!
    ) {
        editSessionBlank(
            complaints: $complaint
            diagnose: $diagnose
            inspections: $inspections
            appointmentResults: $appointmentResults
            appointmentBlankId: $appointmentBlankId
        ) {
            __typename
        }
    }
`;
