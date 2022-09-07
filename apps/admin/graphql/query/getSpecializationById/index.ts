import { gql } from "@apollo/client";

export const GET_SPEC_BY_ID = gql`
    query getSpecializationById($specializationId: String!) {
        getSpecializationById(specializationId: $specializationId) {
            name
            description
            services {
                _id
                description
                name
                price
                durationInMinutes
            }
        }
    }
`;
