import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import TabsHead from "src/plugins/tab-routing/components/TabsHead";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS } from "graphql/query/getDoctors";
import { GET_SPECIALIZATIONS } from "graphql/query/getSpecs";
import { GetSpecializations } from "@graphqlTypes/GetSpecializations";
import { GetAllDoctorsQuery } from "@graphqlTypes/GetAllDoctorsQuery";

const StaffPage = () => {
    useEffect(() => {
        Router.push("staff?route=staff-doctors");
    }, []);
    const routes: TabRoute[] = [
        {
            slug: "staff-doctors",
            label: "Врачи",
            component: <DoctorsContainer />,
        },
    ];

    const { data, loading } = useQuery<GetSpecializations>(GET_SPECIALIZATIONS);
    const specializations = data?.getSpecializations;
    const [currentSpec, setCurrentSpec] = useState({});
    const [searchName, setSearchName] = useState("");
    return (
        <div>
            <div className="flex justify-between">
                <p className="font-bold text-4xl">Сотрудники</p>
                <div className="flex space-x-2">
                    <Link href="/add-doctor">
                        <button className="flex bg-pink-purple p-2 text-white rounded items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-3 my-5 ">
                <div className="col-start-1 col-end-6 bg-white p-1 rounded-xl">
                    <TabsHead routes={routes}></TabsHead>
                </div>
                <div className="col-start-6 col-end-9 bg-white rounded dropdown ">
                    <div
                        tabIndex="0"
                        className="flex items-center justify-between bg-white p-2 h-full rounded cursor-pointer"
                    >
                        {currentSpec?.name ?? "Специализация"}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex="0"
                        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 h-96 overflow-y-scroll z-1000"
                    >
                        <li onClick={() => setCurrentSpec(null)}>
                            <a> Все</a>
                        </li>
                        {specializations?.map((spec) => (
                            <li onClick={() => setCurrentSpec(spec)}>
                                <a>{spec.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-start-9 col-end-13 bg-white rounded flex items-center p-3 space-x-3">
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        onChange={(e) => setSearchName(e.target.value)}
                        type="text"
                        placeholder="Поиск по имени"
                        className="px-2 focus:outline-none"
                    />
                </div>
            </div>
            <div>
                <DoctorsContainer
                    searchName={searchName}
                    specId={currentSpec?._id}
                ></DoctorsContainer>
            </div>
        </div>
    );
};

const DoctorsContainer = ({ specId, searchName }: any) => {
    const { loading, error, data } = useQuery<GetAllDoctorsQuery>(GET_DOCTORS);
    if (loading) return <></>;
    if (error) return <></>;
    const doctors = data?.getAllDoctors;
    let filteredDoctors = doctors;
    if (specId) {
        filteredDoctors = doctors?.filter((doctor) =>
            doctor.specializations?.map((spec) => spec._id).includes(specId),
        );
    }

    var re = new RegExp(searchName + ".+$", "i");
    filteredDoctors = filteredDoctors?.filter(function (e, i, a) {
        return e.fullName.search(re) != -1;
    });
    return (
        <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-2xl min-h-screen">
            {filteredDoctors?.map((doctor: any) => (
                <DoctorCard doctor={doctor} />
            ))}
        </div>
    );
};

interface Doctor {
    fullname: string;
    specializations: string[];
    avatar: {
        m: string;
    };
    _id: string;
}

const DoctorCard = ({
    doctor: { fullName, specializations, avatar, _id },
}: {
    doctor: Doctor;
}) => {
    const [avatarUrl, setAvatarUrl] = useState(
        avatar?.m || "/icons/medical-lady-2.svg",
    );

    return (
        <Link href={`/staff/${_id}/doctor`}>
            <ElevatedContainer className="rounded-lg">
                <div className="pt-5 px-5 space-y-2 cursor-pointer">
                    <p className="text-special-green h-4">В клинике</p>
                    <p className="h-4">{fullName}</p>
                    <p className="text-gray-400 h-4">
                        {specializations.map((spec) => `${spec.name}, `)}
                    </p>
                    <p className="text-gray-400 h-8">101 кабинет</p>
                    <div className="h-64">
                        <img
                            src={avatarUrl}
                            alt="Доктор"
                            className="self-end h-full"
                            onError={() => setAvatarUrl("/icons/medical-lady-2.svg")}
                        />
                    </div>
                </div>
            </ElevatedContainer>
        </Link>
    );
};

export default StaffPage;
