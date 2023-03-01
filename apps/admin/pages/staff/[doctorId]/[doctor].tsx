import { useMutation, useQuery } from "@apollo/client";
import { GET_DOCTOR_BY_ID } from "graphql/query";
import {
    GetDoctorByID,
    GetDoctorByID_getDoctorByID,
} from "graphql/query/getDoctorById/__generated__/GetDoctorById";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
    getDay,
    getHours,
    format,
    subDays,
    addDays,
    subYears,
    formatDistance,
} from "date-fns";
import ru from "date-fns/locale/ru";
import { EDIT_DOCTOR_AVATAR } from "graphql/mutation/editDoctorAvatar";
import {
    EditDoctorAvatar,
    EditDoctorAvatarVariables,
} from "@graphqlTypes/EditDoctorAvatar";
import Link from "next/link";
import { AcceptableAgeGroup } from "@graphqlTypes/globalTypes";
import { GET_DOCTOR_STATS } from "@src/api/queries/finances";
import { GET_BOOKINGS_OF_DOCTOR } from "@src/api/queries/bookings";
import {
    GET_REVIEW_OF_DOCTOR_QUERY,
    LEAVE_REVIEW_OF_DOCTOR_MUTATION,
} from "@src/api/queries/reviews";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
const DoctorPage = () => {
    const router = useRouter();
    const doctorId = router.query.doctorId;

    const [today, setToday] = useState(new Date());

    const { data, loading } = useQuery<GetDoctorByID>(GET_DOCTOR_BY_ID, {
        variables: { id: doctorId },
    });

    const doctor = data?.getDoctorByID;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-5">
            <div className="text-sm breadcrumbs text-base-300">
                <ul>
                    <li>
                        <a>Все сотрудники</a>
                    </li>
                    <li>
                        <a>{doctor?.fullName}</a>
                    </li>
                </ul>
            </div>
            <div>
                <p className="font-bold text-3xl">{doctor?.fullName}</p>
            </div>
            {doctor && <DoctorInfo doctor={doctor}></DoctorInfo>}
        </div>
    );
};

const DoctorInfo = ({ doctor }: { doctor: GetDoctorByID_getDoctorByID }) => {
    const router = useRouter();
    const doctorId = router.query.doctorId;
    const [today, setToday] = useState(new Date());

    let token = "";
    if (typeof window !== "undefined") {
        token = localStorage.getItem("JWT") || "";
    }
    const { data, loading } = useQuery<GetDoctorByID>(GET_DOCTOR_BY_ID, {
        variables: { id: doctorId },
    });
    const { data: bookingsRes, loading: bookingsLoading } = useQuery(
        GET_BOOKINGS_OF_DOCTOR,
        {
            variables: {
                doctorId: doctorId as string,
                firstDate: subYears(today, 1),

                secondDate: addDays(today, 1),
            },
            context: {
                // example of setting the headers with context per operation
                headers: {
                    Authorization: token,
                },
            },
        },
    );
    const {
        data: financeStatsRes,
        loading: financeLoading,
        error: financeError,
        refetch,
    } = useQuery(GET_DOCTOR_STATS, {
        variables: {
            doctorId: doctorId as string,
            startDate: subDays(today, 1),

            secondDate: addDays(today, 1),
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const accetableAgeGroupsLabels = {
        [AcceptableAgeGroup.Adult]: "Взрослые",
        [AcceptableAgeGroup.Child]: "Дети",
        [AcceptableAgeGroup.Both]: "Взрослые и дети",
    };
    const financeStats = financeStatsRes?.getStatsOfDoctorByPeriodsOfTime;
    const finishedBookings = useMemo(
        () =>
            bookingsRes?.getBookingsByDoctorIdAndDates?.filter(
                (booking) => booking.progress !== "Upcoming",
            ),
        [bookingsRes],
    );

    if (financeLoading || bookingsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-12 gap-4">
                <AvatarDoctor doctor={doctor}></AvatarDoctor>
                <div className="col-start-4 col-end-9 p-5 bg-white rounded-xl space-y-3">
                    <div className="flex justify-between">
                        <p className="text-xl">Информация</p>
                        <Link href={`/edit/${doctor._id}`}>
                            <button className="text-pink-purple flex rounded py-1 px-3 hover:bg-pink-purple hover:text-white">
                                Изменить{" "}
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
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <div>
                        <p className="font-bold">Профессиональная</p>
                        <div>
                            <p className="text-gray-400">Специализация</p>
                            <p>
                                {JSON.stringify(
                                    doctor?.specializations
                                        ?.map((spec) => spec.name)
                                        .join(", "),
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Принимает</p>
                            <p>
                                {
                                    accetableAgeGroupsLabels[
                                        doctor?.acceptableAgeGroup
                                    ]
                                }
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Стаж работы</p>
                            <p>
                                {formatDistance(
                                    new Date(doctor.startingExperienceDate),
                                    new Date(),
                                    {
                                        locale: ru,
                                    },
                                )}{" "}
                                стаж работы
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Средняя оценка</p>
                            <p>{doctor.rating?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">
                                Процент от зароботка
                            </p>
                            <p>50% - клинике</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Контактная</p>
                        <div>
                            <p className="text-gray-400">Телефон</p>
                            <p>+{doctor?.phoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Почта</p>
                            <p>{doctor?.email}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Личная</p>
                        <div>
                            <p className="text-gray-400">Имя</p>
                            <p>{doctor?.fullName}</p>
                        </div>
                    </div>
                </div>
                <div className="col-start-9 col-end-13 space-y-5">
                    <ScheduleCard className="p-5 rounded-xl space-y-3">
                        <div className="flex justify-between">
                            <p className="text-xl">Расписание</p>
                            <Link href={`/edit/${doctor._id}`}>
                                <button className="text-pink-purple flex rounded py-1 px-3 hover:bg-pink-purple hover:text-white">
                                    Изменить{" "}
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
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <hr />
                        <div className="flex">
                            <div className="flex flex-col">
                                {doctor?.workTimes?.map((workTime) => (
                                    <p className="w-full">
                                        {format(
                                            new Date(workTime.startTime),
                                            "EEEE: HH:mm",
                                            {
                                                locale: ru,
                                            },
                                        ) +
                                            " - " +
                                            format(
                                                new Date(workTime.endTime),
                                                "HH:mm",
                                            )}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </ScheduleCard>
                </div>
            </div>
            <ReviewsContainer></ReviewsContainer>
        </div>
    );
};

const AvatarDoctor = ({ doctor }: { doctor: GetDoctorByID_getDoctorByID }) => {
    const [editAvatarMutation, { data, loading, error }] = useMutation<
        EditDoctorAvatar,
        EditDoctorAvatarVariables
    >(EDIT_DOCTOR_AVATAR, {
        refetchQueries: [
            {
                query: GET_DOCTOR_BY_ID,
                variables: { id: doctor._id },
            },
        ],
    });

    const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const avatarFile = e.target.files[0];
            editAvatarMutation({
                variables: {
                    doctorId: doctor._id,
                    image: avatarFile,
                },
            });
        }
    };

    const [avatarUrl, setAvatarUrl] = useState(
        doctor?.avatar?.m || "/icons/medical-lady-2.svg",
    );

    return (
        <div className="col-start-1 col-end-4 space-y-3">
            <DoctorAvatarCard className="flex flex-col justify-center items-center gap-4 p-5 bg-white rounded-xl">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {" "}
                        <img
                            src={avatarUrl}
                            alt=""
                            width={100}
                            onError={() =>
                                setAvatarUrl("/icons/medical-lady-2.svg")
                            }
                        />
                        <label className="bg-gray-100 text-pink-purple py-2 px-4 rounded">
                            Изменить фото
                            <input
                                accept="image/*"
                                onChange={onAvatarChange}
                                className="hidden"
                                type="file"
                            />
                        </label>
                    </>
                )}
            </DoctorAvatarCard>
        </div>
    );
};

const ReviewsContainer = () => {
    const {
        query: { doctorId },
    } = useRouter();

    const { data, loading } = useQuery(GET_REVIEW_OF_DOCTOR_QUERY, {
        variables: {
            doctorId,
        },
    });

    if (loading) {
        return (
            <ElevatedContainer className="rounded-xl p-6 ">
                loading...
            </ElevatedContainer>
        );
    }
    const reviews = data?.getCommentsOfDoctor;

    return (
        <ElevatedContainer className="rounded-xl p-6 bg-base-100 mt-6">
            <div className="flex flex-col gap-y-4 max-h-xxl overflow-y-scroll">
                {reviews?.length === 0 && (
                    <div className=" p-4 bg-base-200 ">
                        <p>Нет отзывов...</p>
                    </div>
                )}
                {reviews?.map((review) => (
                    <div className=" p-4 bg-base-200 rounded-xl">
                        <div className="mb-4">
                            <p className=" font-semibold text-lg">
                                {review?.user?.fullname ?? "Аноним"}{" "}
                                <span className=" font-bold text-success">
                                    {review.rating}/10
                                </span>
                            </p>
                            <p className=" text-base-300">
                                {format(
                                    new Date(review.dateCreated),
                                    "dd.MM.yyyy",
                                )}
                            </p>
                        </div>
                        <p className=" font-light">{review.text}</p>
                    </div>
                ))}
            </div>
        </ElevatedContainer>
    );
};

const RecordCard = () => {
    return (
        <div className="flex space-x-4 items-center">
            <p>9:00</p>
            <div className="h-full w-sm bg-pink-purple"></div>
            <div>
                <p>Иванов Иван</p>
                <p className="text-gray-400">
                    Первичная консультация андролога
                </p>
            </div>
        </div>
    );
};

const PaymentCard = ({ booking }: { booking: any }) => {
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
                        {booking.service.name} - 50%
                    </p>
                </div>
            </div>
            <div className="flex col-start-7 col-end-11 items-center justify-center">
                <p className="text-main-green">{booking.progress}</p>
            </div>
            {booking.progress === "Done" ? (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>+{booking.service.price} тг.</p>
                </div>
            ) : (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>Ничего</p>
                </div>
            )}
        </div>
    );
};
const DoctorAvatarCard = styled.div`
    height: 300px;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 0;
`;

const ScheduleCard = styled.div`
    background-color: #f8f0ff;
`;

export default DoctorPage;
