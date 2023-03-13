import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import Navbar from "components/Navbar";
import styled from "styled-components";
import Image from "next/image";
import Footer from "components/Footer";
import Layout from "components/template/Layout";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import AppointmentTimetable from "components/molecules/AppointmentTimeTable";
import { doctorRoutes as mockSpecs } from "@core/mock/doctorRoutes";
import client from "@/client/apollo-client";
import { GET_ALL_DOCTORS, GET_DOCTOR_BY_ID } from "graphql/queries";
import { Doctor } from "custom_typings/doctor";
import { DoctorRoute } from "custom_typings/doctorRoute";
import Link from "next/link";
import AppointmentModal from "components/atoms/AppointmentModal";
import {
    GetDoctorByID,
    GetDoctorByID_getDoctorByID,
} from "@graphqlTypes/GetDoctorByID";
import { AllowedExperienceAndEducationTypes } from "@graphqlTypes/globalTypes";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_REVIEW_OF_DOCTOR_QUERY,
    LEAVE_REVIEW_OF_DOCTOR_MUTATION,
} from "src/graphql/queries/reviews";
import { format, formatDistanceStrict } from "date-fns";
import { useFormik } from "formik";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
import { ru } from "date-fns/locale";
interface DoctorPageProps {
    doctor: GetDoctorByID_getDoctorByID;
    price: number;
}

const DoctorPage: React.FC<DoctorPageProps> = ({
    doctor,
    price,
}: DoctorPageProps) => {
    return (
        <Layout>
            <AppointmentModal />

            <Navbar></Navbar>
            <main className="container mx-auto p-4">
                <DoctorContentContainer className=" hidden lg:grid  lg:grid-cols-2 gap-x-4">
                    <DoctorGeneralInfo doctor={doctor}></DoctorGeneralInfo>
                    <DoctorAdditionalInfo
                        doctor={doctor}
                    ></DoctorAdditionalInfo>
                    <DoctorExperience doctor={doctor}></DoctorExperience>
                    <DoctorDetailsInfo
                        price={price}
                        doctor={doctor}
                    ></DoctorDetailsInfo>
                </DoctorContentContainer>
                <DoctorContentContainer className="grid lg:hidden grid-cols-1 gap-4">
                    <DoctorGeneralInfo doctor={doctor}></DoctorGeneralInfo>
                    <DoctorAdditionalInfo
                        doctor={doctor}
                    ></DoctorAdditionalInfo>
                    <DoctorDetailsInfo
                        price={price}
                        doctor={doctor}
                    ></DoctorDetailsInfo>
                    <DoctorExperience doctor={doctor}></DoctorExperience>
                </DoctorContentContainer>
            </main>
            <Footer></Footer>
        </Layout>
    );
};

const ReviewsContainer = () => {
    const { data: user } = useSession({
        required: false,
    });

    const isAuth = user?.accessToken;
    const {
        query: { id: doctorId },
    } = useRouter();

    const { data, loading } = useQuery(GET_REVIEW_OF_DOCTOR_QUERY, {
        variables: {
            doctorId,
        },
    });

    const [leaveCommentMutation] = useMutation(LEAVE_REVIEW_OF_DOCTOR_MUTATION);

    const { values, handleSubmit, handleChange } = useFormik({
        initialValues: {
            rating: 0,
            text: "",
        },
        async onSubmit({ rating, text }) {
            await leaveCommentMutation({
                variables: {
                    doctorId,
                    rating,
                    text,
                },
                context: {
                    headers: {
                        authorization: user?.accessToken,
                    },
                },
                refetchQueries: [GET_REVIEW_OF_DOCTOR_QUERY, GET_DOCTOR_BY_ID],
            });
            alert("Вы оставили комментарий");
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
        <ElevatedContainer className="rounded-xl p-6 ">
            <form className="flex flex-col mb-4" onSubmit={handleSubmit}>
                <div className=" flex items-center justify-between mb-6 flex-wrap">
                    <p className="text-2xl font-medium text-base-300">
                        Отзывы {reviews?.length}
                    </p>
                    {isAuth ? (
                        <button
                            type="submit"
                            className=" btn btn-primary btn-outline btn-lg py-1"
                        >
                            Добавить отзыв
                        </button>
                    ) : (
                        <button className="btn btn-disabled  btn-lg py-1">
                            Войдите для отправки отзыва
                        </button>
                    )}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Комментарий</span>
                    </label>
                    <textarea
                        onChange={handleChange}
                        name="text"
                        value={values.text}
                        placeholder="Type here"
                        className=" textarea textarea-bordered w-full "
                    />
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Оценка</span>
                    </label>
                    <input
                        onChange={handleChange}
                        name="rating"
                        value={values.rating}
                        type="number"
                        min={1}
                        max={10}
                        placeholder="Оценка"
                        className="input input-bordered w-full "
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            Минимально 1, максимально 10
                        </span>
                    </label>
                </div>
            </form>
            <div className="flex flex-col gap-y-4 max-h-xxl overflow-y-scroll">
                {reviews?.length === 0 && (
                    <div className=" p-4 bg-base-200 ">
                        <p>Нет отзывов...</p>
                    </div>
                )}
                {reviews?.map((review) => (
                    <div className=" p-4 bg-base-200 ">
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
const DoctorDetailsInfo = (props: {
    doctor: GetDoctorByID_getDoctorByID;
    price: number;
}) => {
    const { doctor, price } = props;

    return (
        <div>
            <ElevatedContainer className="rounded-xl p-6 mb-12">
                <AppointmentTimetable doctor={doctor}></AppointmentTimetable>
            </ElevatedContainer>
            <div className="mb-8">
                <PricesInfo price={price}></PricesInfo>
            </div>
            <div>
                <ElevatedContainer className="rounded-xl p-6 mb-12">
                    <p className="text-gray-400 mb-2">
                        Выберите время записи на прием
                    </p>
                    <div className="flex justify-start mb-6">
                        <p className="font-medium text-3xl tracking-wide border-b border-black">
                            +77081097577
                        </p>
                    </div>
                    <div className="flex items">
                        <Link href="https://www.instagram.com/lucem_medical_clinic/">
                            <div className="px-4 py-2 space-x-2 rounded-md border-2 border-main-purple flex items-center justify-center text-main-purple font-medium text-lg mr-4 cursor-pointer">
                                <Image
                                    height="30"
                                    width="30"
                                    src="/icons/instagram.svg"
                                ></Image>
                                <span>Instagram</span>
                            </div>
                        </Link>
                        <Link href="https://api.whatsapp.com/send/?phone=77972707010&text&app_absent=0">
                            <div className="px-4 py-2 space-x-2 rounded-md border-2 border-main-green flex items-center justify-center text-main-green font-medium text-lg cursor-pointer">
                                <Image
                                    height="30"
                                    width="30"
                                    src="/icons/whatsapp.svg"
                                ></Image>
                                <span>Whatsapp</span>
                            </div>
                        </Link>
                    </div>
                </ElevatedContainer>
                <ReviewsContainer />
            </div>
        </div>
    );
};

const converExperienceToDisplayArray = (
    doctor: GetDoctorByID_getDoctorByID,
) => {
    const experienceTypeToIcon = {
        [AllowedExperienceAndEducationTypes.Experience]: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
        ),
        [AllowedExperienceAndEducationTypes.Education]: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
        ),
        ["Courses"]: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
        ),
    };
    const experienceTypeToLabel = {
        [AllowedExperienceAndEducationTypes.Experience]: "Опыт работы",
        [AllowedExperienceAndEducationTypes.Education]: "Образование",
        ["Courses"]: "Курсы и семинары",
    };

    console.log(doctor.experiences);
    // take only first occurence of each experience type

    const doctorExperience = doctor?.experiences?.map((experience) => {
        return {
            type: experienceTypeToLabel[experience.name],
            data: experience.data,
            icon: experienceTypeToIcon[experience.name],
        };
    });

    //
    return doctorExperience ?? [];
};

const DoctorExperience = ({
    doctor,
}: {
    doctor: GetDoctorByID_getDoctorByID;
}) => {
    const doctorExperience = converExperienceToDisplayArray(doctor);

    console.log(doctorExperience);
    return (
        <div>
            {doctorExperience.map((experience) => (
                <div className="space-y-4 mb-12">
                    <h3 className="font-bold text-3xl tracking-wide">
                        {experience.type}
                    </h3>
                    {experience.data.map((value) => (
                        <ExperienceItem
                            insitutionName={value?.institutionName}
                            icon={experience.icon}
                            label={value?.specialty}
                            startYear={value?.years[0]?.toString()}
                            finishYear={value?.years[1]?.toString()}
                        ></ExperienceItem>
                    ))}
                </div>
            ))}
        </div>
    );
};

const PricesInfo = ({ price = 6000 }) => {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 items-start gap-4 ">
            <div className="flex flex-col items-start bg-light-grey p-4 rounded-md mr-6">
                <div className="flex flex-col items-star mb-6">
                    <span className="font-bold text-3xl">{price} ₸</span>
                    <span>Первичный прием</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="font-bold text-3xl">4000₸</span>
                    <span>Повторный прием</span>
                </div>
            </div>

            <p className="flex-1 flex-col flex items-start">
                <span className="mb-4">
                    Если вы были на приеме у данного врача более 6 месяцев назад
                    или не были вовсе — вам автоматически будет назначет
                    Первичный прием.
                </span>
                <span>
                    Если вы были у данного врача в течение 6 месяцев — вам
                    автоматически будет назначен Повторный прием.
                </span>
            </p>
        </div>
    );
};
const DoctorContentContainer = styled.div`
    grid-template-rows: auto 1fr;
`;

interface ExperienceItemProps {
    icon?: JSX.Element;
    label: string;
    startYear: string;
    finishYear: string;
    insitutionName: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
    icon,
    startYear,
    finishYear,
    label,
    insitutionName,
}) => {
    return (
        <div className="flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <div className="space-x-1 text-xl font-medium">
                    {insitutionName} <span>{startYear}</span>
                    <span>-</span>
                    <span>{finishYear}</span>
                    <span>гг.</span>
                </div>
                <span className="text-dark-grey">{label}</span>
            </div>
        </div>
    );
};

const DoctorGeneralInfo = (props: { doctor: GetDoctorByID_getDoctorByID }) => {
    const { doctor } = props;
    return (
        <section>
            <div className="mb-16">
                <h1 className=" font-bold text-4xl lg:text-7xl text-left">
                    {doctor?.fullName}
                </h1>
                <ul className="list-disc list-inside p-4 mb-4">
                    {doctor?.specializations?.map((spec) => (
                        <li>{spec.name}</li>
                    ))}
                    <li className=" text-yellow-500">
                        Принимает только взрослых
                    </li>
                </ul>
                <div className="grid grid-cols-3 gap-4">
                    <PropertyBox className=" bg-light-grey flex flex-col items-start justify-center rounded px-4 py-8">
                        <span className="capitalize font-bold text-lg lg:text-2xl">
                            {formatDistanceStrict(
                                new Date(doctor.startingExperienceDate),
                                new Date(),
                                {
                                    locale: ru,
                                    addSuffix: false,
                                },
                            )}{" "}
                            опыта работы
                        </span>
                    </PropertyBox>
                    <PropertyBox className=" bg-light-grey flex flex-col items-start justify-center rounded px-4 py-8">
                        <span className="font-bold text-4xl lg:text-7xl">
                            {doctor.numOfRatings}
                        </span>
                        <span>отзывов</span>
                    </PropertyBox>
                    <PropertyBox className=" bg-light-grey flex flex-col items-start justify-center rounded px-4 py-8">
                        <span className="font-bold text-4xl lg:text-7xl text-green-400">
                            {Number(doctor?.rating).toFixed(2)}
                        </span>
                        <span>рейтинг</span>
                    </PropertyBox>
                </div>
            </div>
        </section>
    );
};

const DoctorAdditionalInfo = ({
    doctor,
}: {
    doctor: GetDoctorByID_getDoctorByID;
}) => {
    return (
        <div className=" h-full relative flex justify-center">
            <img
                className="h-xxl object-contain"
                src={doctor?.avatar?.xl ?? "/images/doctor.png"}
                alt="doctor"
            />
        </div>
    );
};

const PropertyBox = styled.div``;

export default DoctorPage;

export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await client.query<GetDoctorByID>({
        query: GET_DOCTOR_BY_ID,
        variables: { doctorId: context?.params?.id },
    });

    const { data: serviceRes } = await client.query({
        query: GET_SERVICE_BY_ID,
        variables: { serviceId: "618c0c4985b2fd7b37e3656e" },
    });

    const doctor = data.getDoctorByID;
    const service = serviceRes.getServiceById;
    const price = service.price;
    return {
        props: {
            doctor,
            price,
        },
        revalidate: 10,
        notFound: !doctor,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allDoctorsRes = await client.query({ query: GET_ALL_DOCTORS });
    const allDoctors: Doctor[] = allDoctorsRes.data.getAllDoctors;
    const paths = allDoctors.map((doc) => ({
        params: { id: doc._id },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};
