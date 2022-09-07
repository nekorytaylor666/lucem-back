import {
  Doctor,
  Session,
  useGetSessionsByPeriodQuery,
} from "@lucem/shared-gql";
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
  const { loading, error } = res;
  if (loading || error) {
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
  const sessions = res?.data?.getSessionPeriodTime ?? [];

  const totalMoneyEarnt = _.sumBy(sessions, "price");
  const totalProfitArray = sessions.map(
    (el) => (el.price * el.clinicPercnetage) / 100
  );
  const totalProfit = _.sum(totalProfitArray);
  const totalSessions = sessions.length;

  const doctors = _.groupBy(sessions, "doctor.fullName");
  const doctorStats = new Map<string, { [x: string]: number }>();
  for (const fullName in doctors) {
    if (Object.prototype.hasOwnProperty.call(doctors, fullName)) {
      const element = doctors[fullName];
      const stats = calculateServiceStatsForSessions(element);
      console.log("ststs:", stats, doctors);
      doctorStats.set(fullName, stats);
    }
  }
  const servicesTotalSums = calculateServiceStatsForSessions(sessions);
  return {
    stats: {
      revenue: totalMoneyEarnt,
      profit: totalProfit,
      totalSessions,
      servicesTotalSums,
      doctorStats,
    },
    ...res,
  };
};

const calculateServiceStatsForSessions = (sessions: Session[]) => {
  const services = _.groupBy(sessions, "service._id");
  const servicesStats = _.mapKeys(services, (value, key) => {
    return value[0]?.service?.name;
  });
  const servicesTotalSums = _.mapValues(servicesStats, (el) =>
    _.sumBy(el, "price")
  );

  return servicesTotalSums;
};
