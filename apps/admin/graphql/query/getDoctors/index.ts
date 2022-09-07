import { gql } from "@apollo/client";

export const GET_DOCTORS = gql`
    query GetAllDoctorsQuery {
        getAllDoctors {
            _id
            acceptableAgeGroup
            avatar {
                m
            }
            description
            email
            fullName
            numOfRatings
            phoneNumber
            rating
            specializations {
                name
                _id
            }
        }
    }
`;

export const GET_DOCTORS_SEARCH = gql`
    query GetAllDoctors {
        getAllDoctors {
            _id
            fullName
            specializations {
                _id
                name
            }
        }
    }
`;
