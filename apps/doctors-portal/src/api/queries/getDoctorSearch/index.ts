import { gql } from "@apollo/client";

export const GET_DOCTORS_SEARCH = gql`
    query GetDoctorSearch {
        getAllDoctors {
            _id
            fullName
            acceptableAgeGroup
            description
            email
            fullName
            numOfRatings
            phoneNumber
            rating
            upcomingBookings {
                _id
                startDate
                endDate
            }
            avatar {
                xl
            }
            specializations {
                name
            }
            workTimes {
                endTime
                startTime
            }
        }
    }
`;
