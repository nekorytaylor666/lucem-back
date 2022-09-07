import { gql } from "@apollo/client";

export const CREATE_FORWARD = gql`
  mutation CreateForward($serviceId: [String!]!, $userId: String!) {
    createForward(serviceIds: $serviceId, userId: $userId) {
      _id
    }
  }
`;
