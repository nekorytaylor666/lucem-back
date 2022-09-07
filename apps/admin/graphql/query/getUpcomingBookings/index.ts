import { gql } from "@apollo/client";

export const GET_UPCOMING_BOOKINGS = gql`
    query GetUpcomingBookingsQuery($page: Int!) {
        getUpcomingBookings(page: $page) {
            _id
            startDate
            endDate
        }
    }
`;
