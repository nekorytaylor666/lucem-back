import { gql } from "@apollo/client";

export const GET_GENERAL_STATS = gql`
    query GetGeneralStats(
        $startDate: DateTime!
        $secondDate: DateTime!
        $period: AllowedPeriodsOfTime!
    ) {
        getGeneralStats(
            firstDate: $startDate
            secondDate: $secondDate
            period: $period
        ) {
            totalMoneyEarnt
            totalSessionSum
            totalIndividualPatients
            data {
                day
                month
                sum
                type
                year
            }
        }
    }
`;

export const GET_SPEC_STATS = gql`
    query SpecStats($firstDate: DateTime!, $secondDate: DateTime!) {
        getSpecializationStatsByPeriodOfTime(
            firstDate: $firstDate
            secondDate: $secondDate
        ) {
            individualSpecialistNum
            specialization {
                _id
                name
            }
            totalNumSessions
            totalMoneyEarnt
        }
    }
`;
