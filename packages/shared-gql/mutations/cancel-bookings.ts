import { gql } from "@apollo/client";
import client from "@src/apollo/apollo-client";

export const CANCEL_BOOKING = gql`
  mutation cancelBooking($bookingId: String!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      service {
        name
      }
    }
  }
`;

export const cancelBooking = async (bookingId: string, token: string) => {
  const { data } = await client.mutate({
    mutation: CANCEL_BOOKING,
    variables: {
      bookingId,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
  return data.cancelBooking;
};
