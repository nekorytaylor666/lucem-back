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

export const DETACH_DOCTOR_FROM_SPECIALIZATION = gql`
    mutation DetachSpecialization(
        $doctorId: String!
        $specializationId: String!
    ) {
        dettachDoctorFromSpecialization(
            doctorId: $doctorId
            specializationId: $specializationId
        ) {
            _id
        }
    }
`;
