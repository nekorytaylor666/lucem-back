import gql from "graphql-tag";

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
