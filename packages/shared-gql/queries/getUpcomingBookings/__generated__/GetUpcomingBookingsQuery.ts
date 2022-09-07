/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUpcomingBookingsQuery
// ====================================================

export interface GetUpcomingBookingsQuery_getUpcomingBookings {
  __typename: "Booking";
  _id: string;
  startDate: any;
  endDate: any;
}

export interface GetUpcomingBookingsQuery {
  getUpcomingBookings: GetUpcomingBookingsQuery_getUpcomingBookings[];
}

export interface GetUpcomingBookingsQueryVariables {
  page: number;
}
