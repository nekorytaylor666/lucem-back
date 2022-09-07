/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetActiveSession
// ====================================================

export interface GetActiveSession_getActiveSessionByUserId_booking_service {
    __typename: "Service";
    name: string;
}

export interface GetActiveSession_getActiveSessionByUserId_booking {
    __typename: "Booking";
    service: GetActiveSession_getActiveSessionByUserId_booking_service | null;
}

export interface GetActiveSession_getActiveSessionByUserId {
    __typename: "Session";
    _id: string;
    count: number;
    startDate: string;
    booking: GetActiveSession_getActiveSessionByUserId_booking | null;
}

export interface GetActiveSession {
    getActiveSessionByUserId: GetActiveSession_getActiveSessionByUserId | null;
}

export interface GetActiveSessionVariables {
    userId: string;
}
