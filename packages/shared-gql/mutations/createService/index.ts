import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $description: String!
    $doctorIds: [String!]
    $durationInMinutes: Int
    $isShown: Boolean
    $name: String!
    $price: Int!
    $specializationId: String!
  ) {
    createService(
      description: $description
      doctorIds: $doctorIds
      durationInMinutes: $durationInMinutes
      isShown: $isShown
      name: $name
      price: $price
      specializationIds: [$specializationId]
    ) {
      _id
      name
    }
  }
`;
