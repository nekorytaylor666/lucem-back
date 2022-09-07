/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GetUpcomingBookings
// ====================================================

export interface GetUpcomingBookings_getUpcomingBookings_doctor_avatar {
  __typename: "PhotoURL";
  m: string | null;
}

export interface GetUpcomingBookings_getUpcomingBookings_doctor {
  __typename: "Doctor";
  _id: string;
  avatar: GetUpcomingBookings_getUpcomingBookings_doctor_avatar | null;
  fullName: string;
}

export interface GetUpcomingBookings_getUpcomingBookings_user {
  __typename: "User";
  fullName: string;
  phoneNumber: string;
  _id: string;
}

export interface GetUpcomingBookings_getUpcomingBookings_service {
  __typename: "Service";
  name: string;
  price: number;
}

export interface GetUpcomingBookings_getUpcomingBookings {
  __typename: "Booking";
  _id: string;
  doctor: GetUpcomingBookings_getUpcomingBookings_doctor;
  startDate: any;
  user: GetUpcomingBookings_getUpcomingBookings_user;
  service: GetUpcomingBookings_getUpcomingBookings_service | null;
  endDate: any;
}

export interface GetUpcomingBookings {
  getUpcomingBookings: GetUpcomingBookings_getUpcomingBookings[];
}
