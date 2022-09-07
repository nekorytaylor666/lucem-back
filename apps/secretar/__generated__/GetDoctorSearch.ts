/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDoctorSearch
// ====================================================

export interface GetDoctorSearch_getAllDoctors_upcomingBookings {
  __typename: "Booking";
  _id: string;
  startDate: any;
  endDate: any;
}

export interface GetDoctorSearch_getAllDoctors_avatar {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetDoctorSearch_getAllDoctors_specializations {
  __typename: "Specialization";
  name: string;
}

export interface GetDoctorSearch_getAllDoctors_workTimes {
  __typename: "WorkTime";
  endTime: any;
  startTime: any;
}

export interface GetDoctorSearch_getAllDoctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  acceptableAgeGroup: string | null;
  description: string | null;
  email: string;
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  upcomingBookings: GetDoctorSearch_getAllDoctors_upcomingBookings[] | null;
  avatar: GetDoctorSearch_getAllDoctors_avatar | null;
  specializations: GetDoctorSearch_getAllDoctors_specializations[] | null;
  workTimes: GetDoctorSearch_getAllDoctors_workTimes[] | null;
}

export interface GetDoctorSearch {
  getAllDoctors: GetDoctorSearch_getAllDoctors[];
}
