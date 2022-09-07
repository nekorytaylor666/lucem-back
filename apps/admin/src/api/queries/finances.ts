import client from "src/apollo/apollo-client";
import gql from "graphql-tag";

export const GET_DOCTOR_STATS = gql`
    query getStatsOfDoctorByPeriodsOfTime(
        $doctorId: String!
        $startDate: DateTime!
        $secondDate: DateTime!
    ) {
        getStatsOfDoctorByPeriodsOfTime(
            doctorId: $doctorId
            firstDate: $startDate
            secondDate: $secondDate
        ) {
            totalMoneyEarnt
            totalNumOfSessions
        }
    }
`;

export interface FinanceStats {
    totalMoneyEarnt: number;
    totalNumOfSessions: number;
}

interface FinancesRes {
    getStatsOfDoctorByPeriodsOfTime: FinanceStats;
}

export const getFinanceStatsOfDoctor = async (
    {
        doctorId,
        startDate,
        secondDate,
    }: { doctorId: string; startDate: Date; secondDate: Date },
    { token }: { token: string },
): Promise<FinanceStats> => {
    const { data } = await client.query<FinancesRes>({
        query: GET_DOCTOR_STATS,
        variables: {
            doctorId,
            startDate: startDate.toISOString(),
            secondDate: secondDate.toISOString(),
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data.getStatsOfDoctorByPeriodsOfTime;
    return res;
};
