import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
    query GetServicesByDoctorIds($doctorId: [String!]!, $page: Int!) {
        getServicesByDoctorIds(doctorId: $doctorId, page: $page) {
            _id
            description
            name
            price
        }
    }
`;
