/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStatsOfDoctorByPeriodsOfTime
// ====================================================

export interface getStatsOfDoctorByPeriodsOfTime_getStatsOfDoctorByPeriodsOfTime {
  __typename: "DoctorSpecStatsGraph";
  totalMoneyEarnt: number;
  totalNumOfSessions: number;
}

export interface getStatsOfDoctorByPeriodsOfTime {
  getStatsOfDoctorByPeriodsOfTime: getStatsOfDoctorByPeriodsOfTime_getStatsOfDoctorByPeriodsOfTime;
}

export interface getStatsOfDoctorByPeriodsOfTimeVariables {
  startDate: any;
  secondDate: any;
}
