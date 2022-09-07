import gql from "graphql-tag";

export const UPLOAD_APPOINTMENT_RESULTS = gql`
    mutation UploadAppointmentResults(
        $description: String!
        $image: Upload!
        $userId: String!
    ) {
        uploadAppointmentResults(
            description: $description
            image: $image
            userId: $userId
        ) {
            _id
        }
    }
`;
