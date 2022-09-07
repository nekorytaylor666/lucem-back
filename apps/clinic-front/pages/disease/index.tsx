import React from "react";
import TopInfo from "../../components/organisms/TopInfo";
import DoctorContainer from "components/organisms/DoctorContainer";
import Layout from "components/template/Layout";
import AppointmentModal from "components/atoms/AppointmentModal";
import { useAllSpecializations } from "@recoil/hooks";

import { Specialization } from "custom_typings/specialization";
import { Doctor } from "custom_typings/doctor";
import Footer from "components/Footer";
import { GET_ALL_DOCTORS } from "graphql/queries";
import client from "@/client/apollo-client";
import { useQuery } from "@apollo/client";
import {
    GetAllDoctors,
    GetAllDoctors_getAllDoctors,
} from "@graphqlTypes/GetAllDoctors";

const DeseasePage: React.FC = () => {
    const { data, loading } = useQuery<GetAllDoctors>(GET_ALL_DOCTORS);
    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
    const doctors = data?.getAllDoctors;
    return (
        <Layout>
            <div className="bg-gray-100">
                <AppointmentModal />
                <TopInfo />
                <div className="container py-10 px-4">
                    <div className="flex">
                        <div className="flex-1">
                            <p className=" text-2xl lg:text-6xl font-extrabold">
                                Запись к врачу
                            </p>
                        </div>
                    </div>
                    <br />
                    {doctors.map(
                        (
                            doctor: GetAllDoctors_getAllDoctors,
                            index: number,
                        ) => {
                            return (
                                <DoctorContainer key={index} doctor={doctor} />
                            );
                        },
                    )}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default DeseasePage;
