import gql from "graphql-tag";

export const GET_APPOINTMENTS_RESULTS = gql`
    query getAppointmentResults($userId: String!) {
        getAppointmentResultsByUser(userId: $userId) {
            description
            photoURL {
                xl
            }
        }
    }
`;
