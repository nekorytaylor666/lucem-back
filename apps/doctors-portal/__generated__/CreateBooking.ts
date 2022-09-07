/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBooking
// ====================================================

export interface CreateBooking_createBooking {
    __typename: "Booking";
    _id: string;
    startDate: any;
}

export interface CreateBooking {
    createBooking: CreateBooking_createBooking;
}

export interface CreateBookingVariables {
    doctorId: string;
    endDate?: any | null;
    serviceId?: string | null;
    startDate: any;
    userId?: string | null;
}
