/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetActiveSessionByUserId
// ====================================================

export interface GetActiveSessionByUserId_getActiveSessionByUserId_booking_service {
  __typename: "Service";
  name: string;
}

export interface GetActiveSessionByUserId_getActiveSessionByUserId_booking {
  __typename: "Booking";
  service: GetActiveSessionByUserId_getActiveSessionByUserId_booking_service | null;
}

export interface GetActiveSessionByUserId_getActiveSessionByUserId {
  __typename: "Session";
  _id: string;
  count: number;
  startDate: string;
  booking: GetActiveSessionByUserId_getActiveSessionByUserId_booking | null;
}

export interface GetActiveSessionByUserId {
  getActiveSessionByUserId: GetActiveSessionByUserId_getActiveSessionByUserId | null;
}

export interface GetActiveSessionByUserIdVariables {
  userId: string;
}
