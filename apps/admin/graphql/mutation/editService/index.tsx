import { gql } from "@apollo/client";

export const EDIT_SERVICE = gql`
    mutation EditService(
        $description: String
        $doctorIds: [String!]
        $durationInMinutes: Int
        $isShown: Boolean
        $name: String
        $price: Float
        $serviceId: String!
        $specializationId: [String!]
    ) {
        editService(
            description: $description
            doctorIds: $doctorIds
            durationInMinutes: $durationInMinutes
            isShown: $isShown
            name: $name
            price: $price
            serviceId: $serviceId
            specializationId: $specializationId
        ) {
            _id
            name
        }
    }
`;
