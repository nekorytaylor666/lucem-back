import { gql } from "@apollo/client";

export const GET_DOCTOR_BY_ID = gql`
    query GetDoctorByID($doctorId: String!) {
        getDoctorByID(doctorId: $doctorId) {
            _id
            fullName
            acceptableAgeGroup
            description
            email
            fullName
            numOfRatings
            phoneNumber
            rating
            workTimes {
                endTime
                startTime
            }
            upcomingBookings {
                _id
                startDate
                endDate
            }
            experiences {
                data {
                    years
                    institutionName
                    specialty
                }
                name
            }
            avatar {
                xl
            }
            specializations {
                name
            }
        }
    }
`;
