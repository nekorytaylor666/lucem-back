/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllDoctors
// ====================================================

export interface GetAllDoctors_getAllDoctors_upcomingBookings {
  __typename: "Booking";
  _id: string;
  startDate: any;
  endDate: any;
}

export interface GetAllDoctors_getAllDoctors_avatar {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetAllDoctors_getAllDoctors_specializations {
  __typename: "Specialization";
  name: string;
}

export interface GetAllDoctors_getAllDoctors_workTimes {
  __typename: "WorkTime";
  endTime: any;
  isActive: boolean | null;
  startTime: any;
}

export interface GetAllDoctors_getAllDoctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  acceptableAgeGroup: string | null;
  description: string | null;
  email: string;
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  upcomingBookings: GetAllDoctors_getAllDoctors_upcomingBookings[] | null;
  avatar: GetAllDoctors_getAllDoctors_avatar | null;
  specializations: GetAllDoctors_getAllDoctors_specializations[] | null;
  workTimes: GetAllDoctors_getAllDoctors_workTimes[] | null;
}

export interface GetAllDoctors {
  getAllDoctors: GetAllDoctors_getAllDoctors[];
}
