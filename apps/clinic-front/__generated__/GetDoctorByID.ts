/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllowedExperienceAndEducationTypes } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetDoctorByID
// ====================================================

export interface GetDoctorByID_getDoctorByID_workTimes {
    __typename: "WorkTime";
    endTime: any;
    startTime: any;
}

export interface GetDoctorByID_getDoctorByID_upcomingBookings {
    __typename: "Booking";
    _id: string;
    startDate: any;
    endDate: any;
}

export interface GetDoctorByID_getDoctorByID_experiences_data {
    __typename: "ExperienceAndEducationData";
    years: number[];
    institutionName: string;
    specialty: string;
}

export interface GetDoctorByID_getDoctorByID_experiences {
    __typename: "ExperienceAndEducation";
    data: GetDoctorByID_getDoctorByID_experiences_data[] | null;
    name: AllowedExperienceAndEducationTypes;
}

export interface GetDoctorByID_getDoctorByID_avatar {
    __typename: "PhotoURL";
    xl: string | null;
}

export interface GetDoctorByID_getDoctorByID_specializations {
    __typename: "Specialization";
    name: string;
}

export interface GetDoctorByID_getDoctorByID {
    __typename: "Doctor";
    _id: string;
    fullName: string;
    acceptableAgeGroup: string | null;
    description: string | null;
    email: string;
    numOfRatings: number;
    phoneNumber: string;
    rating: number | null;
    workTimes: GetDoctorByID_getDoctorByID_workTimes[] | null;
    upcomingBookings: GetDoctorByID_getDoctorByID_upcomingBookings[] | null;
    experiences: GetDoctorByID_getDoctorByID_experiences[] | null;
    avatar: GetDoctorByID_getDoctorByID_avatar | null;
    specializations: GetDoctorByID_getDoctorByID_specializations[] | null;
}

export interface GetDoctorByID {
    getDoctorByID: GetDoctorByID_getDoctorByID;
}

export interface GetDoctorByIDVariables {
    doctorId: string;
}
