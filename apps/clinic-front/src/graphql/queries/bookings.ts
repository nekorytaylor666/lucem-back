import client from "src/apollo/apollo-client";
import gql from "graphql-tag";
import { Booking } from "custom_typings/booking";

export const GET_UPCOMING_QUERIES = gql`
    query GetBookingsOfUser($userId: String!) {
        getBookingsOfUser(userId: $userId, page: 1) {
            _id
            doctor {
                _id
                avatar {
                    m
                }
                fullName
            }
            startDate
            progress
            user {
                fullName
                phoneNumber
                _id
            }

            service {
                name
                price
            }
            endDate
        }
    }
`;

interface BookingsRes {
    getUpcomingBookings: Booking[];
}

export const getUpcomingBookings = async ({ token }: { token: string }) => {
    const { data } = await client.query<BookingsRes>({
        query: GET_UPCOMING_QUERIES,
        context: {
            // example of setting the headers with context per operation
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data.getUpcomingBookings;
    return res;
};
