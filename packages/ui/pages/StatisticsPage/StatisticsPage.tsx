import React, { useEffect, useState } from "react";

import Router from "next/router";
import { useQuery } from "@apollo/client";

import { subMonths, addMonths, addYears, subYears, format } from "date-fns";

import { useFormik } from "formik";
import {
  AllowedPeriodsOfTime,
  Session,
  useGetSessionsByPeriodQuery,
} from "@lucem/shared-gql";
import _ from "lodash";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { StatsData, useFinanceStats } from "../../utils/finance";
import MoneyBarChart from "./MoneyBarChart";
import PatientsBarChart from "./PatientsBarChart";

const StatisticsPage = () => {
  const routes = [
    {
      slug: "money-chart",
      label: "Деньги",
      component: (props) => <MoneyBarChart {...props} />,
    },
    {
      slug: "pateints-chart",
      label: "Пациенты",
      component: (props) => <PatientsBarChart {...props} />,
    },
  ];
  const [currentRoute, setCurrentRoute] = useState(routes[0]);
  const [today, setToday] = useState<Date>(new Date());
  useEffect(() => {
    setToday(new Date());
  }, []);

  const { values, handleChange } = useFormik<{ period: "month" | "year" }>({
    initialValues: {
      period: "month",
    },
    onSubmit() {
      console.log("submit");
    },
  });

  const [] = useState();

  const periodsHashMap = {
    month: {
      period: AllowedPeriodsOfTime.Month,
      addPeriod: addMonths,
      subPeriod: subMonths,
    },
    year: {
      period: AllowedPeriodsOfTime.Year,
      addPeriod: addYears,
      subPeriod: subYears,
    },
  };

  const startTime = periodsHashMap[values.period].subPeriod(today, 1);
  const endTime = periodsHashMap[values.period].addPeriod(today, 1);

  const { loading, data, stats } = useFinanceStats(startTime, endTime);
  if (loading) {
    return <div>Loading...</div>;
  }
  const sessions = data?.getSessionPeriodTime;
  console.log("статистика здесь", sessions);
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Статистика</p>
        <div className="flex space-x-2">
          <div className="flex p-1 rounded bg-white space-x-2">
            <label
              className={`px-2 py-1 hover:bg-pink-purple rounded cursor-pointer hover:text-white ${
                values.period === "month" && "bg-pink-purple text-white"
              }`}
            >
              <p>Месяц</p>
              <input
                onChange={handleChange}
                name="period"
                type="radio"
                value="month"
                className="hidden"
              />
            </label>
            <label
              className={`px-2 py-1 hover:bg-pink-purple rounded cursor-pointer hover:text-white ${
                values.period === "year" && "bg-pink-purple text-white"
              }`}
            >
              <p>Года</p>
              <input
                onChange={handleChange}
                name="period"
                type="radio"
                value="year"
                className="hidden"
              />
            </label>
          </div>
          <div className="flex text-gray-400 px-2 py-1 items-center bg-white rounded space-x-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <p>
              {format(startTime, "dd.MM.yy")} -{format(endTime, "dd.MM.yy")}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl space-y-4">
        {currentRoute.component({ data: sessions })}
        <PeriodStats data={stats}></PeriodStats>
      </div>
    </div>
  );
};

const PeriodStats = ({
  data: { totalSessions, profit, revenue, servicesTotalSums, doctorStats },
}: {
  data: StatsData;
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 rounded p-5">
          <p className="text-4xl font-bold">{revenue} ₸</p>
          <p className="text-gray-400">заработано в заданный период</p>
        </div>
        <div className="bg-gray-100 rounded p-5">
          <p className="text-4xl font-bold">{profit} ₸</p>
          <p className="text-gray-400">Доход клиники в заданный период</p>
        </div>
        <div className="bg-gray-100 rounded p-5">
          <p className="text-4xl font-bold">{totalSessions} шт.</p>
          <p className="text-gray-400">услуг оказано в заданный период</p>
        </div>
      </div>

      <Tabs variant={"unstyled"}>
        <TabList>
          <Tab _selected={{ color: "white", bg: "primary", borderRadius: 4 }}>
            Услуги
          </Tab>
          <Tab _selected={{ color: "white", bg: "primary", borderRadius: 4 }}>
            Доктора
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="grid grid-cols-3 gap-4">
              {_.toPairs(servicesTotalSums)?.map(([name, sum]) => (
                <div className="rounded-md shadow p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 flex items-center">
                      <p className="text-xl font-medium">{name}</p>
                      {/* <p className=" text-base-300 text-base">
                                        {el.individualSpecialistNum}{" "}
                                        специалистов
                                    </p>
                                    <p className="text-base-300 text-base">
                                        оказываемых услуг
                                    </p>
                                    <p>48 новых пациентов</p>
                                    <p>{el.totalNumSessions} услуг оказано</p> */}
                    </div>
                    <div className=" bg-daily-green h-full flex justify-center items-center   rounded-md">
                      <p className="text-3xl font-bold text-white">{sum} ₸</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 gap-4">
              {_.toPairs(doctorStats).map(([doctorName, servicesStats]) => (
                <div>
                  <Heading mb={4} size={"xs"}>
                    {doctorName}
                  </Heading>
                  <div className="grid grid-cols-3 gap-4">
                    {_.toPairs(servicesStats)?.map(([name, sum]) => (
                      <div className="rounded-md shadow p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-28 flex items-center">
                            <p className="text-xl font-medium">{name}</p>
                            {/* <p className=" text-base-300 text-base">
                                        {el.individualSpecialistNum}{" "}
                                        специалистов
                                        </p>
                                        <p className="text-base-300 text-base">
                                        оказываемых услуг
                                        </p>
                                        <p>48 новых пациентов</p>
                                      <p>{el.totalNumSessions} услуг оказано</p> */}
                          </div>
                          <div className=" bg-daily-green h-full flex justify-center items-center   rounded-md">
                            <p className="text-3xl font-bold text-white">
                              {sum} ₸
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default StatisticsPage;
