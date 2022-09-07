import { gql } from "@apollo/client";

export const CREATE_SPECIALIZATION_MUTATION = gql`
  mutation CreateSpecialization(
    $colorCodeGradient: ColorCodeGradientInput
    $description: String!
    $image: Upload
    $name: String!
  ) {
    createSpecialization(
      colorCodeGradient: $colorCodeGradient
      description: $description
      image: $image
      name: $name
    ) {
      _id
      name
    }
  }
`;
