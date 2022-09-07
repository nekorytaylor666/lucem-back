import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import getAdminLayout from "components/layouts/adminLayout";
import {
    getUpcomingBookings,
    GET_BOOKINGS_OF_DOCTOR,
    GET_UPCOMING_QUERIES,
} from "@src/api/queries/bookings";
import { Booking } from "@core/types/bookings/IBookings";
import Link from "next/link";
import { format, subDays } from "date-fns";
import ru from "date-fns/locale/ru";
import {
    FinanceStats,
    getFinanceStatsOfDoctor,
    GET_DOCTOR_STATS,
} from "@src/api/queries/finances";
import { useQuery } from "@apollo/client";
import { getDoctorTokens } from "@src/utils/getToken";
import { addDays } from "date-fns";
import router from "next/router";
import { startSessionMutation } from "@src/api/mutations/session";
import {
    getBookingsOfDoctor,
    getBookingsOfDoctorVariables,
} from "@graphqlTypes/getBookingsOfDoctor";
import { cancelBooking } from "@src/api/mutations/cancel-bookings";
import { useGetDoctorByIdQuery } from "@lucem/shared-gql";

const MainPage = () => {
    const [today, setToday] = useState(new Date());
    const { token, doctorId } = getDoctorTokens();
    const { data: bookingsRes, loading: bookingsLoading } = useQuery<
        getBookingsOfDoctor,
        getBookingsOfDoctorVariables
    >(GET_BOOKINGS_OF_DOCTOR, {
        variables: {
            doctorId,
            firstDate: subDays(today, 1),

            secondDate: addDays(today, 1),
        },
        context: {
            // example of setting the headers with context per operation
            headers: {
                Authorization: token,
            },
        },
    });

    const { data: doctorInfo, loading: doctorLoading } = useGetDoctorByIdQuery({
        variables: { id: doctorId },
    });

    const upcomingBookings = useMemo(
        () =>
            bookingsRes?.getBookingsByDoctorIdAndDates?.filter(
                (booking) =>
                    booking.progress !== "Done" &&
                    booking.progress !== "Canceled",
            ),
        [bookingsRes],
    );
    const finishedBookings = useMemo(
        () =>
            bookingsRes?.getBookingsByDoctorIdAndDates?.filter(
                (booking) => booking.progress !== "Upcoming",
            ),
        [bookingsRes],
    );

    const {
        data: financeStatsRes,
        loading: financeLoading,
        error: financeError,
        refetch,
    } = useQuery(GET_DOCTOR_STATS, {
        variables: {
            startDate: today,

            secondDate: addDays(today, 1),
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const financeStats = financeStatsRes?.getStatsOfDoctorByPeriodsOfTime;

    const getNextBooking = (bookings: Booking[]) => {
        return bookings[0];
    };
    const nextBooking = useMemo(
        () => getNextBooking(upcomingBookings ?? []),
        [upcomingBookings],
    );

    if (
        bookingsLoading ||
        financeLoading ||
        doctorLoading ||
        !financeStats ||
        !upcomingBookings
    ) {
        console.log(bookingsLoading, upcomingBookings);
        return <div>Loading...</div>;
    }
    const onStartNextSession = async (booking) => {
        console.log("booking:", booking);
        if (booking.progress === "Upcoming") {
            await startSessionMutation(
                { bookingId: booking._id },
                { token: token },
            );
        }
        router.push(`/patients/${booking.user._id}`);
    };

    const onCancelBooking = async (booking) => {
        console.log("booking:", booking);
        if (booking.progress === "Upcoming") {
            try {
                await cancelBooking(booking._id, token);
                alert("Бронирование отменено");
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between">
                <p className="text-3xl font-bold"></p>
                <p className=" text-gray-400 self-center">
                    {format(new Date(Date.now()), "dd MMMM, hh:mm", {
                        locale: ru,
                    })}
                </p>
            </div>
            <hr className="my-3" />
            <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    {nextBooking ? (
                        <RegistrationCard className="col-start-1 col-end-7 p-5 space-y-2 rounded">
                            <div className="flex justify-between">
                                <p>Ближайшая запись</p>
                                <p>
                                    {format(
                                        new Date(nextBooking.startDate),
                                        "dd MMMM",
                                        { locale: ru },
                                    )}
                                    ,{" "}
                                    {new Date(nextBooking.startDate).getHours()}
                                    :00
                                </p>
                            </div>
                            <div className="flex rounded p-3 bg-white justify-between shadow-md">
                                <div className="flex space-x-2">
                                    <img
                                        src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
                                        alt=""
                                        className="h-12 w-12"
                                    />
                                    <div>
                                        <p className="text-xl ">
                                            {nextBooking.user.fullName}
                                        </p>
                                        <p>{nextBooking.user.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    <p>{nextBooking.service.name}</p>
                                    <p>{nextBooking.service.price} тг.</p>
                                </div>
                            </div>
                            <div className="flex h-12 space-x-2">
                                <button
                                    className="w-full"
                                    onClick={() =>
                                        onStartNextSession(nextBooking)
                                    }
                                >
                                    <div className=" bg-pink-purple h-full flex items-center justify-center  text-white py-1 rounded text-center cursor-pointer">
                                        Перейти к пациенту
                                    </div>
                                </button>
                                {nextBooking &&
                                nextBooking.progress === "Upcoming" ? (
                                    <button
                                        onClick={() =>
                                            onCancelBooking(nextBooking)
                                        }
                                        className="w-full  border border-pink-purple text-pink-purple py-1 rounded"
                                    >
                                        Отменить
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </RegistrationCard>
                    ) : (
                        <div className="flex rounded p-3 bg-white shadow-md col-span-6">
                            <div className="flex justify-center items-center h-full">
                                <p className="text-center font-medium text-xl">
                                    Нет записей
                                </p>
                            </div>
                        </div>
                    )}
                    <FinanceCard className="p-5 space-y-14 rounded col-start-7 col-end-10">
                        <div className="flex justify-between">
                            <p>Финансы</p>
                            <button onClick={() => refetch()}>
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
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <div className="flex">
                                <p className="text-main-green text-4xl font-bold">
                                    {(financeStats.totalMoneyEarnt *
                                        doctorInfo.getDoctorByID
                                            .doctorPercentage) /
                                        100}
                                    <span>₸</span>
                                </p>
                            </div>
                            <div>
                                <p>за сегодня</p>
                            </div>
                        </div>
                    </FinanceCard>
                    <PatientStatCard className="p-5 space-y-14 rounded col-start-10 col-end-13">
                        <div className="flex justify-between">
                            <p>Принято пациентов в этом месяце</p>
                        </div>
                        <div className="">
                            <div className="flex">
                                <p className="text-4xl font-bold">
                                    {financeStats.totalNumOfSessions}
                                </p>
                            </div>
                            <div>
                                <p>человек</p>
                            </div>
                        </div>
                    </PatientStatCard>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <ScheduleCard className="p-5 rounded col-start-1 col-end-7">
                        <div className="flex justify-between">
                            <p>
                                Расписание на сегодня{" "}
                                <span className="text-gray-400">
                                    {" "}
                                    - {upcomingBookings.length} пациентов{" "}
                                </span>
                            </p>
                            <div className="space-x-2">
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
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="h-96 overflow-auto space-y-2">
                            {upcomingBookings.map((booking) => (
                                <PatientCard
                                    onStartSession={(id) =>
                                        onStartNextSession(id)
                                    }
                                    booking={booking}
                                ></PatientCard>
                            ))}
                        </div>
                    </ScheduleCard>
                    <ScheduleCard className="p-5 rounded col-start-7 col-end-13 space-y-2">
                        <p>Прошедшие записи</p>
                        <div className="h-96 overflow-auto space-y-2">
                            {finishedBookings.map((booking) => (
                                <PostRecordCard
                                    booking={booking}
                                ></PostRecordCard>
                            ))}
                        </div>
                    </ScheduleCard>
                </div>
            </div>
        </div>
    );
};

const PatientCard = ({
    booking,
    onStartSession,
}: {
    booking: Booking;
    onStartSession: (id: number) => void;
}) => {
    return (
        <div className="rounded shadow-md grid grid-cols-12 bg-white p-2">
            <div className="flex justify-center col-start-1 col-end-3">
                <p className="">{new Date(booking.startDate).getHours()}:00</p>
            </div>
            <div className="col-start-3 col-end-8">
                <p>{booking.user.fullName}</p>
                <p className="text-gray-400">{booking.service.name}</p>
            </div>
            <div className="flex items-center col-start-8 col-end-12">
                <button onClick={() => onStartSession(booking)}>
                    <div className="border cursor-pointer border-pink-purple text-pink-purple py-2 px-12 rounded hover:bg-pink-purple hover:text-white text-center">
                        Перейти
                    </div>
                </button>
            </div>
        </div>
    );
};

const PostRecordCard = ({ booking }: { booking: Booking }) => {
    return (
        <div className="rounded shadow-md grid grid-cols-12 bg-white p-2">
            <div className="flex justify-center col-start-1 col-end-3">
                <p className="">
                    {format(new Date(booking.startDate), "hh:mm")}
                </p>
            </div>
            <div className="col-start-3 col-end-8">
                <p>{booking.user.fullName}</p>
                <p className="text-gray-400">{booking.service.name}</p>
            </div>
            <div className="flex items-center justify-end col-start-8 col-end-12">
                <p className="text-main-green">{booking.progress}</p>
            </div>
        </div>
    );
};

const RegistrationCard = styled.div`
    background-color: #faf5ff;
`;

const ScheduleCard = styled.div`
    background-color: #f7f7f7;
`;

const FinanceCard = styled.div`
    background-color: #f0fff2;
`;

const PatientStatCard = styled.div`
    background-color: #f0f3ff;
`;
export default MainPage;
