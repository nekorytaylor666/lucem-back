import getAdminLayout from "components/layouts/adminLayout";
import { Booking } from "custom_typings/booking";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import {
    getUpcomingBookings,
    GET_UPCOMING_QUERIES,
} from "src/graphql/queries/bookings";
import { format, isFuture } from "date-fns";
import ru from "date-fns/locale/ru";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
    GetUpcomingBookings,
    GetUpcomingBookings_getUpcomingBookings,
    GetUpcomingBookings_getUpcomingBookings_doctor,
} from "src/graphql/queries/__generated__/GetUpcomingBookings";
const bookingsType = [
    { label: "Предстоящие", value: "Upcoming" },
    { label: "Завершенные", value: "Done" },
    { label: "Отмененные", value: "Canceled" },
];

const PatientBookingPage = () => {
    const router = useRouter();
    const { data: user } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/dashboard/signin");
            // The user is not authenticated, handle it here.
        },
    });
    if (!user?.accessToken) {
        return <>Authorizing...</>;
    }
    return (
        <BookingsPatient
            userId={user._id}
            token={user.accessToken}
        ></BookingsPatient>
    );
};
PatientBookingPage.getLayout = (page: NextPage) => getAdminLayout(page);

const BookingsPatient = ({ token, userId }) => {
    const { data, loading, refetch } = useQuery(GET_UPCOMING_QUERIES, {
        context: {
            headers: {
                Authorization: token,
            },
        },
        variables: {
            userId: userId,
        },
        skip: !token,
    });
    const bookings = data?.getBookingsOfUser;
    const [bookingsFilterTabType, setBookingsFilterTabType] = useState(
        bookingsType[0].value,
    );

    const filteredBookings = useMemo(() => {
        return bookings?.filter(
            (booking) =>
                (booking.progress === bookingsFilterTabType &&
                    booking.progress !== "Upcoming") ||
                (booking.progress === "Upcoming" &&
                    isFuture(new Date(booking.startDate))),
        );
    }, [bookingsFilterTabType, bookings]);
    console.log(filteredBookings, bookings);
    if (loading)
        return (
            <div className="h-full w-full flex justify-center items-center">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <h1 className="text-3xl font-bold mb-4">Записи</h1>
                <div className="tabs tabs-boxed flex flex-col lg:flex-row">
                    {bookingsType.map(({ label, value }) => (
                        <a
                            onClick={() => setBookingsFilterTabType(value)}
                            className={` ${
                                value === bookingsFilterTabType
                                    ? "tab  tab-active w-full"
                                    : "tab w-full"
                            } `}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                {!filteredBookings.length && <p>Нет броней</p>}
                {filteredBookings?.map((booking) => (
                    <UpcomingBookingCard
                        booking={booking}
                    ></UpcomingBookingCard>
                ))}
            </div>
        </div>
    );
};

const UpcomingBookingCard = ({
    booking,
}: {
    booking: GetUpcomingBookings_getUpcomingBookings;
}) => {
    return (
        <div className=" shadow-lg rounded-lg p-4 w-full">
            <div>
                <p className="text-xl">{booking.service.name}</p>
                <p className="text-base-300">
                    {format(
                        new Date(booking.startDate),
                        "dd MMM yyyy - HH:mm",
                        {
                            locale: ru,
                        },
                    )}{" "}
                    - {booking.service.price}₸
                </p>
            </div>
            <div className="w-full border my-2 border-base-300"></div>
            <div className="grid grid-cols-2 gap-4">
                <img
                    className="w-full"
                    src={booking?.doctor?.avatar?.m}
                    alt="doctor"
                />
                <div className="flex flex-col h-full justify-between py-4">
                    <div>
                        <p className="text-base-300">Доктор</p>
                        <p className="text-xl font-medium">
                            {booking.doctor.fullName}
                        </p>
                    </div>
                    <div>
                        <p>Стаж 10 лет</p>
                        <p>Врач первой категории</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientBookingPage;
