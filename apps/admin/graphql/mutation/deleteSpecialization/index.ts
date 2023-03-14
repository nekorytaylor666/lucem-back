import { gql } from "@apollo/client";

export const DELETE_SPEC_BY_ID = gql`
    mutation DeleteSpecialization($specializationId: String!) {
        deleteSpecialization(specializationId: $specializationId)
    }
`;
