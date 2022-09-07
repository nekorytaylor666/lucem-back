import client from "src/apollo/apollo-client";
import gql from "graphql-tag";
import { Booking } from "@core/types/bookings/IBookings";

export const GET_UPCOMING_QUERIES = gql`
    query getUpcomingBookingsOfDoctor {
        getUpcomingBookingsOfDoctor {
            _id
            doctor {
                _id
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
            }
            endDate
        }
    }
`;

export const GET_BOOKINGS_OF_DOCTOR = gql`
    query getBookingsOfDoctor(
        $doctorId: String!
        $firstDate: DateTime!
        $secondDate: DateTime!
    ) {
        getBookingsByDoctorIdAndDates(
            doctorId: $doctorId
            secondDate: $secondDate
            firstDate: $firstDate
        ) {
            _id
            doctor {
                _id
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
    getUpcomingBookingsOfDoctor: Booking[];
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
    const res = data.getUpcomingBookingsOfDoctor;
    return res;
};
