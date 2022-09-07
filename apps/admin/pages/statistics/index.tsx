import React, { useEffect, useState } from "react";
import MoneyBarChart from "components/atoms/MoneyBarChart";
import PatientsBarChart from "components/atoms/PatientsBarChart";
import ServiceBarChart from "components/atoms/ServiceBarChart";
import TabsHead from "src/plugins/tab-routing/components/TabsHead";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import {
    GET_GENERAL_STATS,
    GET_SPEC_STATS,
} from "graphql/query/getGeneralStats";
import {
    GetGeneralStats,
    GetGeneralStatsVariables,
} from "@graphqlTypes/getGeneralStats";
import { subMonths, addMonths, addYears, subYears, format } from "date-fns";
import { AllowedPeriodsOfTime } from "@graphqlTypes/globalTypes";

import { useFormik } from "formik";
import {
    SpecStats,
    SpecStatsVariables,
    SpecStats_getSpecializationStatsByPeriodOfTime,
} from "@graphqlTypes/SpecStats";

const StatisticsPage = () => {
    useEffect(() => {
        Router.push("statistics?route=money-chart");
    }, []);
    let token = "";
    if (typeof window !== "undefined") {
        token = localStorage.getItem("JWT") || "";
    }
    const routes: TabRoute[] = [
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

    const startDate = periodsHashMap[values.period].subPeriod(today, 1);
    const secondDate = periodsHashMap[values.period].addPeriod(today, 1);

    const { data, loading } = useQuery<
        GetGeneralStats,
        GetGeneralStatsVariables
    >(GET_GENERAL_STATS, {
        variables: {
            startDate,
            secondDate,
            period: periodsHashMap[values.period].period,
        },
        skip: !today,
        context: {
            headers: {
                Authorization: token,
            },
        },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    const stats = data?.getGeneralStats;

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <p className="text-4xl font-bold">Статистика</p>
                <div className="flex space-x-2">
                    <div className="flex p-1 rounded bg-white space-x-2">
                        <label
                            className={`px-2 py-1 hover:bg-pink-purple rounded cursor-pointer hover:text-white ${
                                values.period === "month" &&
                                "bg-pink-purple text-white"
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
                                values.period === "year" &&
                                "bg-pink-purple text-white"
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
                            {format(startDate, "dd.MM.yy")} -
                            {format(secondDate, "dd.MM.yy")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl space-y-4">
                <div className="flex justify-between">
                    <div className="flex rounded">
                        <div className="w-full bg-light-grey rounded-lg p-1 flex justify-evenly gap-2 cursor-pointer">
                            {routes.map((route) => (
                                <a
                                    onClick={() => setCurrentRoute(route)}
                                    key={route.slug}
                                >
                                    <div
                                        className={`w-full flex justify-center items-center p-2 rounded ${
                                            route.slug === currentRoute.slug
                                                ? "bg-link-purple text-white"
                                                : "text-black"
                                        }`}
                                    >
                                        {route.label}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div></div>
                </div>
                {currentRoute.component({ data: stats?.data })}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-100 rounded p-5">
                        <p className="text-4xl font-bold">
                            {stats?.totalMoneyEarnt} ₸
                        </p>
                        <p className="text-gray-400">
                            заработано в заданный период
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded p-5">
                        <p className="text-4xl font-bold">
                            {stats?.totalIndividualPatients}
                        </p>
                        <p className="text-gray-400">
                            новых клиентов в заданный год
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded p-5">
                        <p className="text-4xl font-bold">
                            {stats?.totalSessionSum}
                        </p>
                        <p className="text-gray-400">
                            услуг оказано в заданный период
                        </p>
                    </div>
                </div>
                <SpecStatsSection></SpecStatsSection>
            </div>
        </div>
    );
};

const SpecStatsSection = () => {
    const [today, setToday] = useState<Date>();
    useEffect(() => {
        setToday(new Date());
    }, []);

    const { data, loading } = useQuery<SpecStats, SpecStatsVariables>(
        GET_SPEC_STATS,
        {
            variables: {
                firstDate: subYears(today!, 1),
                secondDate: addYears(today!, 1),
            },
        },
    );

    if (loading) {
        return <div>...loading</div>;
    }
    const specStats = data?.getSpecializationStatsByPeriodOfTime;
    return (
        <div>
            <p className="text-4xl font-bold">По специализациям</p>
            <div className=" border-b-2 border-base-200 my-4 " />
            <div className="grid grid-cols-3 gap-4">
                {specStats?.map((el) => (
                    <div className="rounded-md shadow p-4">
                        <div className="grid grid-cols-2">
                            <div>
                                <p className="text-xl font-medium">
                                    {el.specialization.name}
                                </p>
                                <p className=" text-base-300 text-base">
                                    {el.individualSpecialistNum} специалистов
                                </p>
                                <p className="text-base-300 text-base">
                                    оказываемых услуг
                                </p>
                                <p>48 новых пациентов</p>
                                <p>{el.totalNumSessions} услуг оказано</p>
                            </div>
                            <div className=" bg-daily-green h-full flex justify-center items-center   rounded-md">
                                <p className="text-3xl font-bold text-white">
                                    {el.totalMoneyEarnt} ₸
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsPage;
