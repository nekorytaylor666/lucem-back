import { gql } from "@apollo/client";

export const EDIT_SPECIALIZATION_WITHOUT_FILE_MUTATION = gql`
    mutation EditSpecializationWithoutFile(
        $colorCode: String!
        $description: String!
        $specializationId: String!
        $name: String!
        $colorCodeGradient: ColorCodeGradientInput
    ) {
        editSpecializationWithoutFile(
            colorCode: $colorCode
            description: $description
            specializationId: $specializationId
            name: $name
            colorCodeGradient: $colorCodeGradient
        ) {
            _id
            name
        }
    }
`;
