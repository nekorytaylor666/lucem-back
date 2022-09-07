import { useGetSessionsByPeriodQuery } from "@lucem/shared-gql";
import _ from "lodash";

export interface StatsData {
    profit: number;
    revenue: number;
    totalSessions: number;
    servicesTotalSums: { [x: string]: number };
}

export const useFinanceStats = (startTime: Date, endTime: Date) => {
    const res = useGetSessionsByPeriodQuery({
        variables: {
            startTime,
            endTime,
        },
    });
    const { loading } = res;
    if (loading) {
        return {
            ...res,
            stats: {
                profit: 0,
                revenue: 0,
                totalSessions: 0,
                servicesTotalSums: {},
            },
        };
    }
    const sessions = res.data.getSessionPeriodTime;

    const totalMoneyEarnt = _.sumBy(sessions, "price");
    const totalProfitArray = sessions.map(
        (el) => (el.price * el.clinicPercnetage) / 100,
    );
    const totalProfit = _.sum(totalProfitArray);
    const totalSessions = sessions.length;
    const services = _.groupBy(sessions, "service._id");
    const servicesStats = _.mapKeys(services, (value, key) => {
        return value[0]?.service?.name;
    });
    const servicesTotalSums = _.mapValues(servicesStats, (el) =>
        _.sumBy(el, "price"),
    );
    return {
        stats: {
            revenue: totalMoneyEarnt,
            profit: totalProfit,
            totalSessions,
            servicesTotalSums,
        },
        ...res,
    };
};
