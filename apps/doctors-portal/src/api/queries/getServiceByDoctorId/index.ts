import { gql } from "@apollo/client";

export const GET_SERVICE_BY_DOCTOR_ID = gql`
    query GetServiceByDoctorId($doctorId: String!) {
        getServicesByDoctorId(doctorId: $doctorId) {
            _id
            name
        }
    }
`;
