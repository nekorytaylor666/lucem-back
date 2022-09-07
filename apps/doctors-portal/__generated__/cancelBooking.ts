/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancelBooking
// ====================================================

export interface cancelBooking_cancelBooking_service {
    __typename: "Service";
    name: string;
}

export interface cancelBooking_cancelBooking {
    __typename: "Booking";
    _id: string;
    service: cancelBooking_cancelBooking_service | null;
}

export interface cancelBooking {
    cancelBooking: cancelBooking_cancelBooking;
}

export interface cancelBookingVariables {
    bookingId: string;
}
