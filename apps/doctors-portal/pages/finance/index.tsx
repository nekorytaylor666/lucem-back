import React, { useMemo, useState } from "react";
import styled from "styled-components";
import getAdminLayout from "components/layouts/adminLayout";
import {
    FinanceStats,
    getFinanceStatsOfDoctor,
    GET_DOCTOR_STATS,
} from "@src/api/queries/finances";
import { addDays, format, startOfDay, subDays, subYears } from "date-fns";
import { getSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { getDoctorTokens } from "@src/utils/getToken";
import {
    getBookingsOfDoctor,
    getBookingsOfDoctorVariables,
    getBookingsOfDoctor_getBookingsByDoctorIdAndDates,
} from "@graphqlTypes/getBookingsOfDoctor";
import { GET_BOOKINGS_OF_DOCTOR } from "@src/api/queries/bookings";
import { ru } from "date-fns/locale";
import {
    useGetDoctorByIdQuery,
    useGetSessionsByPeriodQuery,
} from "@lucem/shared-gql";
import _ from "lodash";

const FinancePage = () => {
    const { token, doctorId } = getDoctorTokens();
    const [today, setToday] = useState(new Date());
    const { data: bookingsRes, loading: bookingsLoading } = useQuery<
        getBookingsOfDoctor,
        getBookingsOfDoctorVariables
    >(GET_BOOKINGS_OF_DOCTOR, {
        variables: {
            doctorId,
            firstDate: subYears(today, 1),

            secondDate: addDays(today, 1),
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const { data: doctorInfo, loading: doctorLoading } = useGetDoctorByIdQuery({
        variables: { id: doctorId },
    });
    const { data: financeStatsRes, loading: financeLoading } = useQuery(
        GET_DOCTOR_STATS,
        {
            variables: {
                startDate: subDays(today, 1),

                secondDate: addDays(today, 1),
            },
            context: {
                headers: {
                    Authorization: token,
                },
            },
        },
    );
    const { data: sessionsRes, loading: sessionsLoading } =
        useGetSessionsByPeriodQuery({
            variables: {
                startTime: startOfDay(today),

                endTime: addDays(today, 1),
            },
            context: {
                headers: {
                    Authorization: token,
                },
            },
        });

    const finishedBookings = useMemo(
        () =>
            bookingsRes?.getBookingsByDoctorIdAndDates
                ?.filter((booking) => booking.progress !== "Upcoming")
                .reverse(),
        [bookingsRes],
    );

    const sessions = sessionsRes?.getSessionPeriodTime;
    const stats = useMemo(() => {
        if (sessionsLoading && doctorLoading) return 0;
        const filteredSessions = sessions?.filter(
            (el) => el.doctor._id !== doctorId,
        );
        return {
            revenue:
                (_.sumBy(filteredSessions, "price") *
                    doctorInfo.getDoctorByID.doctorPercentage) /
                100,
        };
    }, [sessions, sessionsLoading]);
    if (financeLoading || bookingsLoading || doctorLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-3xl font-bold">Финансы</p>
                <p className=" text-gray-400 self-center">
                    {format(new Date(), " dd MMMM, yyyy ", { locale: ru })}
                </p>
            </div>
            <hr className="my-3" />
            <div className="py-5">
                <div className="flex">
                    <div className="flex-1 bg-gradient-to-b from-main-green to-green-400 rounded p-10 text-white space-y-10">
                        <div>
                            <p>За сегодня вы получите:</p>
                            <p className="text-4xl font-bold">
                                {stats.revenue}
                                <span>₸</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div>
                <p className="text-lg">История плажетей</p>
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-2 bg-gray-100 p-1 rounded">
                    <div className="flex items-center rounded py-1 px-2 bg-pink-purple text-white cursor-pointer">
                        <p>За все время</p>
                    </div>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-t mt-5">
                <div className="flex justify-between">
                    <p>Платежи полученные за выбранный период времени</p>
                    <p className="text-main-green">
                        +{" "}
                        {(finishedBookings
                            .filter((el) => el.progress === "Done")
                            .reduce((acc, cur) => cur.service.price + acc, 0) *
                            doctorInfo.getDoctorByID.doctorPercentage) /
                            100}
                        тг.
                    </p>
                </div>
                <div className="pt-5">
                    <div className=" h-[400px] overflow-auto space-y-2">
                        {finishedBookings.map((booking) => (
                            <PaymentCard
                                booking={booking}
                                percentage={
                                    doctorInfo.getDoctorByID.doctorPercentage
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentCard = ({
    booking,
    percentage,
}: {
    booking: getBookingsOfDoctor_getBookingsByDoctorIdAndDates;
    percentage: number;
}) => {
    return (
        <div className="grid grid-cols-14 p-5 bg-white rounded">
            <div className="col-start-1 col-end-2">
                <p>
                    {format(new Date(booking.startDate), "yyyy dd MMM ", {
                        locale: ru,
                    })}
                </p>
                <p className="text-gray-400">
                    {" "}
                    {format(new Date(booking.startDate), "HH:mm", {
                        locale: ru,
                    })}
                </p>
            </div>
            <div className="flex col-start-2 col-end-6 space-x-2">
                <img
                    src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
                    alt=""
                    className="h-12 w-12"
                />
                <div>
                    <p>{booking.user.fullName}</p>
                    <p className="text-gray-400">
                        {booking.service.name} - {percentage}%
                    </p>
                </div>
            </div>
            <div className="flex col-start-7 col-end-11 items-center justify-center">
                <p className="text-main-green">{booking.progress}</p>
            </div>
            {booking.progress === "Done" ? (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>+{(booking.service.price * percentage) / 100} тг.</p>
                </div>
            ) : (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>Ничего</p>
                </div>
            )}
        </div>
    );
};

export default FinancePage;
