import React from "react";

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

interface SpecializationsPageProps {
    specializations: Specialization[];
}
const SpecializationsPage: React.FC<SpecializationsPageProps> = ({
    specializations,
}) => {
    const routes: TabRoute[] = [
        {
            slug: "adult",
            label: "Услуги для взрослых",
            component: (
                <SpecializationPageGrid specializations={specializations} />
            ),
        },
        {
            slug: "child",
            label: "Услуги для детей",
            component: (
                <SpecializationPageGrid specializations={specializations} />
            ),
        },
    ];

    const TabBody = useTabRouting({ routes });
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
                            <TabsHead routes={routes}></TabsHead>
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
                            <TabsHead routes={routes}></TabsHead>
                        </div>
                    </div>
                </div>
                <div>{TabBody}</div>
            </div>
            <Footer />
        </Layout>
    );
};

export async function getStaticPaths() {
    return {
        paths: [{ params: { route: "adult" } }, { params: { route: "child" } }],
        fallback: false,
    };
}

export async function getStaticProps() {
    const { data } = await client.query({ query: GET_SPECIALIZATION });
    const specializations = data.getSpecializations;
    return {
        props: {
            specializations,
        }, // will be passed to the page component as props
    };
}
export default SpecializationsPage;
