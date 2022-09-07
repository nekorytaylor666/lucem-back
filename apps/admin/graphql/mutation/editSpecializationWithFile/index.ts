import { gql } from "@apollo/client";

export const EDIT_SPECIALIZATION_WITH_FILE_MUTATION = gql`
    mutation EditSpecializationWithFile(
        $image: Upload!
        $specializationId: String!
    ) {
        editSpecializationWithFile(
            image: $image
            specializationId: $specializationId
        ) {
            _id
            name
        }
    }
`;
