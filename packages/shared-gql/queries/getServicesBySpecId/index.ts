import { gql } from "@apollo/client";

export const GET_SERVICES_BY_SPEC_ID = gql`
  query GetServicesBySpecializationId($specializationId: String!) {
    getServicesBySpecializationId(
      page: 1
      specializationId: $specializationId
    ) {
      _id
      description
      name
      price
    }
  }
`;
