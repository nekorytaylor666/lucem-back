import { GetStaticProps, GetStaticPaths } from "next";
import React, { useMemo } from "react";
import { specializations as mockSpecs } from "@core/mock/specializations";
import { SpecializationEntity } from "@core/types/specializations/ISpecialization";
import Navbar from "components/Navbar";
import Search from "components/atoms/Search";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import TabsHead from "src/plugins/tab-routing/components/TabsHead";
import styled from "styled-components";
import { motion } from "framer-motion";
import Layout from "components/template/Layout";
import AppointmentModal from "components/atoms/AppointmentModal";
import DoctorsList from "../../../components/organisms/doctorsList";
import client from "src/apollo/apollo-client";
import { GET_SPECIALIZATION } from "graphql/queries";
import Footer from "components/Footer";
// import { filterSpecializations } from "src/helper";
import { ParsedUrlQuery } from "querystring";

// import { Doctor } from "custom_typings/doctor";
import { Specialization } from "custom_typings/specialization";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";

interface SpecRoute extends Specialization {
    accentColor?: string;
    imageUrl?: string;
    slug?: string;
}
interface SpecializationPageProps {
    specialization?: Specialization;
}
const SpecializationPage: React.FC<SpecializationPageProps> = ({
    specialization,
}) => {
    if (specialization == null) return <></>;

    const router = useRouter();
    const { age } = router.query;
    const ageGroupsConfig = {
        child: { adult: false, child: true },
        adult: { adult: true, child: false },
        both: { adult: true, child: true },
    };

    const doctors = specialization?.doctors;
    const filteredDoctors = useMemo(() => {
        const acceptableAgeGroup =
            ageGroupsConfig[(age as keyof typeof ageGroupsConfig) ?? "both"];
        const adultDoctors = doctors.filter(
            (el) =>
                (acceptableAgeGroup.adult &&
                    el.acceptableAgeGroup == "adult") ||
                el.acceptableAgeGroup == "both",
        );
        const childDoctors = doctors.filter(
            (el) =>
                acceptableAgeGroup.child && el.acceptableAgeGroup == "child",
        );
        return [...adultDoctors, ...childDoctors];
    }, [age, doctors]);
    const routes: TabRoute[] = [
        {
            slug: "doctors",
            label: "Врачи",
            component: <DoctorsList doctors={filteredDoctors} />,
        },
    ];
    // if (loading) return <></>;
    // if (error) return <>{error?.message}</>;
    return (
        <Layout>
            <AppointmentModal />
            <div className="bg-white">
                <div className="rounded-b-3xl shadow-lg mb-8 pb-4 relative">
                    <motion.div
                        initial={{
                            y: 100,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.3,
                        }}
                        className="mx-auto z-10 relative bg-transparent"
                    >
                        <Navbar light />
                        <div className="block container lg:hidden  p-6">
                            <div className="grid mx-auto grid-cols-1 mb-8">
                                <Search />
                            </div>
                            <div className="w-full mb-8 text-white">
                                <h1 className="text-3xl font-bold mb-4">
                                    {specialization?.name}
                                </h1>
                                <p className="text-xs text-left">
                                    {specialization?.description}
                                </p>
                            </div>
                        </div>
                        {!isMobile && (
                            <div className=" hidden lg:container lg:block">
                                <div className="grid mx-auto grid-cols-2 mb-8">
                                    <Search />
                                </div>
                                <div className="w-1/2 mb-8 text-white">
                                    <h1 className="text-7xl font-bold mb-4">
                                        {specialization?.name}
                                    </h1>
                                    <p className="text-left">
                                        {specialization?.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <SpecialiazationBackgroundDecoration
                        gradientColors={[
                            specialization?.colorCodeGradient?.start || "",
                            "FFF",
                        ]}
                        initial={{
                            width: 0,
                            height: 0,
                            borderRadius: "100%",
                            borderBottomLeftRadius: "1rem",
                            borderBottomRightRadius: "1rem",
                            opacity: 0,
                        }}
                        animate={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 0,
                            borderBottomLeftRadius: "1rem",
                            borderBottomRightRadius: "1rem",
                            opacity: 1,
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute bottom-0 right-0"
                    >
                        {!isMobile && (
                            <motion.img
                                initial={{
                                    x: 100,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: 0.7,
                                    duration: 0.3,
                                }}
                                className=" absolute bottom-0 right-0 w-96 h-96"
                                src={specialization?.photoURL?.xl}
                                alt={specialization?.name}
                            />
                        )}
                    </SpecialiazationBackgroundDecoration>
                </div>
                <Layout>
                    <DoctorsList doctors={filteredDoctors} />
                </Layout>
            </div>
            <Footer />
        </Layout>
    );
};

interface SpecializationCardContainerProps {
    gradientColors: [string, string];
}

const SpecialiazationBackgroundDecoration = styled(
    motion.div,
)<SpecializationCardContainerProps>`
    background-image: ${({ gradientColors }) => `linear-gradient(
        100.17deg,
        ${gradientColors[0]} 0%,
        ${gradientColors[0]} 40%,
        #${gradientColors[1]} 100%
    );`};
`;

export default SpecializationPage;

interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getServerSideProps: GetStaticProps = async (context?) => {
    const { id } = context.params as IParams;
    const allSpecializationsRes = await client.query({
        query: GET_SPECIALIZATION,
    });
    const allSpecializations = allSpecializationsRes?.data?.getSpecializations;

    const specialization = allSpecializations.find(
        (spec: Specialization) => spec._id === id,
    );

    return {
        props: {
            specialization,
        }, // will be passed to the page component as props
    };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//     const { data } = await client.query({ query: GET_SPECIALIZATION });
//     const specializations: Specialization[] = data.getSpecializations;
//     const paths = specializations?.map((spec) => {
//         return { params: { id: spec._id, route: "both" } };
//     });

//     // We'll pre-render only these paths at build time.
//     // { fallback: blocking } will server-render pages
//     // on-demand if the path doesn't exist.
//     return {
//         paths,
//         fallback: false,
//     };
// };
