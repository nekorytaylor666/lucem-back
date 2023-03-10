/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllowedPeriodsOfTime, AllowedGraphTypes } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetGeneralStats
// ====================================================

export interface GetGeneralStats_getGeneralStats_data {
  __typename: "StatsGraphicDatesGraph";
  day: number | null;
  month: number;
  sum: number;
  type: AllowedGraphTypes;
  year: number | null;
}

export interface GetGeneralStats_getGeneralStats {
  __typename: "StatsGraph";
  totalMoneyEarnt: number;
  totalSessionSum: number;
  totalIndividualPatients: number;
  data: GetGeneralStats_getGeneralStats_data[];
}

export interface GetGeneralStats {
  getGeneralStats: GetGeneralStats_getGeneralStats;
}

export interface GetGeneralStatsVariables {
  startDate: any;
  secondDate: any;
  period: AllowedPeriodsOfTime;
}
