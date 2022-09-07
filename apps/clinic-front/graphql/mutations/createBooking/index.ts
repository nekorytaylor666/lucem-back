import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
    mutation CreateBooking(
        $doctorId: String!
        $endDate: DateTime!
        $serviceId: String!
        $startDate: DateTime!
        $userId: String!
    ) {
        createBooking(
            doctorId: $doctorId
            endDate: $endDate
            # serviceId: "618c0c4985b2fd7b37e3656e"
            serviceId: $serviceId
            startDate: $startDate
            userId: $userId
        ) {
            _id
        }
    }
`;
