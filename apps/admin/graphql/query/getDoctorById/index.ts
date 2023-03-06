import { gql } from "@apollo/client";

export const GET_DOCTOR_BY_ID = gql`
    query GetDoctorByID($id: String!) {
        getDoctorByID(doctorId: $id) {
            _id
            acceptableAgeGroup
            avatar {
                m
            }
            cabinet
            description
            deseases {
                _id
            }
            email
            experiences {
                data {
                    institutionName
                    years
                    specialty
                }
                name
            }
            fullName
            languages {
                language
                type
            }
            startingExperienceDate
            numOfRatings
            phoneNumber
            rating
            specializations {
                _id
                name
            }
            workTimes {
                endTime
                startTime
            }
        }
    }
`;
