import { gql } from "@apollo/client";

export const GET_UPCOMING_BOOKINGS = gql`
    query GetBookingsByDate($firstDate: DateTime!, $secondDate: DateTime!) {
        getBookingsByDate(
            page: 1
            firstDate: $firstDate
            secondDate: $secondDate
        ) {
            _id
            doctor {
                _id
                fullName
            }
            progress
            service {
                _id
                name
                price
            }
            user {
                _id
                fullName
                phoneNumber
            }
            startDate
        }
    }
`;
