import { gql } from "@apollo/client";

export const ATTACH_DOCTOR_TO_SPECIALIZATION = gql`
    mutation AttachDoctorToSpecialization(
        $doctorId: String!
        $specializationId: String!
    ) {
        attachDoctorToSpecialization(
            doctorId: $doctorId
            specializationId: $specializationId
        ) {
            _id
        }
    }
`;
