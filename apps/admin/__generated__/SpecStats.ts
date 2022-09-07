/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SpecStats
// ====================================================

export interface SpecStats_getSpecializationStatsByPeriodOfTime_specialization {
  __typename: "Specialization";
  _id: string;
  name: string;
}

export interface SpecStats_getSpecializationStatsByPeriodOfTime {
  __typename: "SpecializationStatsGraph";
  individualSpecialistNum: number;
  specialization: SpecStats_getSpecializationStatsByPeriodOfTime_specialization;
  totalNumSessions: number;
  totalMoneyEarnt: number;
}

export interface SpecStats {
  getSpecializationStatsByPeriodOfTime: SpecStats_getSpecializationStatsByPeriodOfTime[];
}

export interface SpecStatsVariables {
  firstDate: any;
  secondDate: any;
}
