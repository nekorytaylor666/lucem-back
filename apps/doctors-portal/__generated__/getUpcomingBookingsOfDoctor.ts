/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingProgress } from "./globalTypes";

// ====================================================
// GraphQL query operation: getUpcomingBookingsOfDoctor
// ====================================================

export interface getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_doctor {
    __typename: "Doctor";
    _id: string;
    fullName: string;
}

export interface getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_user {
    __typename: "User";
    fullName: string;
    phoneNumber: string;
    _id: string;
}

export interface getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_service {
    __typename: "Service";
    name: string;
}

export interface getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor {
    __typename: "Booking";
    _id: string;
    doctor: getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_doctor | null;
    startDate: any;
    progress: BookingProgress;
    user: getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_user;
    service: getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor_service | null;
    endDate: any;
}

export interface getUpcomingBookingsOfDoctor {
    getUpcomingBookingsOfDoctor: getUpcomingBookingsOfDoctor_getUpcomingBookingsOfDoctor[];
}
