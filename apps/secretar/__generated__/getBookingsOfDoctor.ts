/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingProgress } from "./globalTypes";

// ====================================================
// GraphQL query operation: getBookingsOfDoctor
// ====================================================

export interface getBookingsOfDoctor_getBookingsByDoctorIdAndDates_doctor {
  __typename: "Doctor";
  _id: string;
  fullName: string;
}

export interface getBookingsOfDoctor_getBookingsByDoctorIdAndDates_user {
  __typename: "User";
  fullName: string;
  phoneNumber: string;
  _id: string;
}

export interface getBookingsOfDoctor_getBookingsByDoctorIdAndDates_service {
  __typename: "Service";
  name: string;
  price: number;
}

export interface getBookingsOfDoctor_getBookingsByDoctorIdAndDates {
  __typename: "Booking";
  _id: string;
  doctor: getBookingsOfDoctor_getBookingsByDoctorIdAndDates_doctor | null;
  startDate: any;
  progress: BookingProgress;
  user: getBookingsOfDoctor_getBookingsByDoctorIdAndDates_user;
  service: getBookingsOfDoctor_getBookingsByDoctorIdAndDates_service | null;
  endDate: any;
}

export interface getBookingsOfDoctor {
  getBookingsByDoctorIdAndDates: getBookingsOfDoctor_getBookingsByDoctorIdAndDates[];
}

export interface getBookingsOfDoctorVariables {
  doctorId: string;
  firstDate: any;
  secondDate: any;
}
