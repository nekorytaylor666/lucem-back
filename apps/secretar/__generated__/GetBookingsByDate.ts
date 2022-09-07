/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingProgress } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBookingsByDate
// ====================================================

export interface GetBookingsByDate_getBookingsByDate_doctor {
  __typename: "Doctor";
  _id: string;
  fullName: string;
}

export interface GetBookingsByDate_getBookingsByDate_service {
  __typename: "Service";
  _id: string;
  name: string;
  price: number;
}

export interface GetBookingsByDate_getBookingsByDate_user {
  __typename: "User";
  _id: string;
  fullName: string;
  phoneNumber: string;
}

export interface GetBookingsByDate_getBookingsByDate {
  __typename: "Booking";
  _id: string;
  doctor: GetBookingsByDate_getBookingsByDate_doctor | null;
  progress: BookingProgress;
  service: GetBookingsByDate_getBookingsByDate_service | null;
  user: GetBookingsByDate_getBookingsByDate_user;
  startDate: any;
}

export interface GetBookingsByDate {
  getBookingsByDate: GetBookingsByDate_getBookingsByDate[];
}

export interface GetBookingsByDateVariables {
  firstDate: any;
  secondDate: any;
}
