import React, { useState } from "react";

import Navbar from "components/Navbar";
import Search from "components/atoms/Search";
import SpecializationPageGrid from "components/organisms/SpecializationPageGrid";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import TabsHead from "src/plugins/tab-routing/components/TabsHead";
import Layout from "components/template/Layout";
import Footer from "components/Footer";
import client from "@/client/apollo-client";
import { GET_SPECIALIZATION } from "graphql/queries";
import { Specialization } from "custom_typings/specialization";
import { useQuery } from "@apollo/client";
import SpecializationTextGrid from "components/organisms/SpecializationPageGrid/grid";

interface SpecializationsPageProps {
    specializations: Specialization[];
}
const SpecializationsPage: React.FC<SpecializationsPageProps> = () => {
    const { data, loading } = useQuery(GET_SPECIALIZATION, {
        fetchPolicy: "no-cache",
    });
    const [activeTabe, setActiveTabe] = useState("grid");
    console.log(data);
    if (loading) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
    const specializations = data.getSpecializations;
    return (
        <Layout>
            <div className="bg-white">
                <div className="rounded-b-3xl shadow-lg mb-8 pb-4">
                    <div className="mx-auto">
                        <Navbar />
                        <div className=" hidden lg:container">
                            <div className="grid mx-auto grid-cols-2 mb-8">
                                <Search />
                            </div>
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-7xl font-bold">
                                    Все услуги <br /> клиники Lucem
                                </h1>
                                <p className=" text-right">
                                    Более 20 специализаций первоклассных врачей.
                                </p>
                            </div>
                        </div>
                        <div className="container lg:hidden p-6">
                            <div className="grid mx-auto grid-cols-1 mb-4">
                                <Search />
                            </div>
                            <div className="flex flex-col justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold">
                                    Все услуги <br /> клиники Lucem
                                </h1>
                                <p className=" text-left">
                                    Более 20 специализаций первоклассных врачей.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-8 pt-0">
                    <div className="tabs tabs-boxed mb-4 bg-white">
                        <a
                            onClick={() => setActiveTabe("grid")}
                            className={
                                "tab tab-lg " +
                                (activeTabe === "grid" ? "tab-active" : "")
                            }
                        >
                            Сетка
                        </a>
                        <a
                            onClick={() => setActiveTabe("cards")}
                            className={
                                "tab tab-lg " +
                                (activeTabe === "cards" ? "tab-active" : "")
                            }
                        >
                            Карты
                        </a>
                    </div>
                    {activeTabe === "cards" && (
                        <SpecializationTextGrid
                            specializations={specializations}
                        />
                    )}
                    {activeTabe === "grid" && (
                        <SpecializationPageGrid
                            specializations={specializations}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default SpecializationsPage;
