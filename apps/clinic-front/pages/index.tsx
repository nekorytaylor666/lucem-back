import { GetStaticProps } from "next";
import React from "react";
import Navbar from "components/Navbar";
import Search from "components/atoms/Search";
import styled from "styled-components";
import Image from "next/image";
import ServicesContainer from "components/organisms/ServicesContainer";
import SpecializationsContainer from "components/organisms/SpecializationsContainer";
import SpecialistsContainer from "components/organisms/SpecialistsContainer";
import ApproachContainer from "components/organisms/ApproachContainer";
import InformationContainer from "components/organisms/InformationContainer";
import Footer from "components/Footer";
import Layout from "components/template/Layout";
import { useAllSpecializations } from "@recoil/hooks";
import { GET_MAINPAGE } from "graphql/queries/getMainPage";
import { useQuery } from "@apollo/client";
import client from "@/client/apollo-client";

const HomePage: React.FC = ({ specializations, doctors }) => {
    return (
        <Layout>
            <div className="container">
                <Navbar />
                <DesktopHeader></DesktopHeader>
                <MobileHeader></MobileHeader>
                <div>
                    <ServicesContainer />
                </div>
                <div className="p-4">
                    <SpecializationsContainer
                        specializations={specializations}
                    />
                </div>
                <div>
                    <SpecialistsContainer doctors={doctors} />
                </div>

                <div>
                    <ApproachContainer />
                </div>
                <div>
                    <InformationContainer />
                </div>

                <Footer />
            </div>
        </Layout>
    );
};

const DesktopHeader = () => {
    return (
        <div className="hidden lg:flex h-xxl">
            <div className="flex-1 space-y-10">
                <div className="space-y-4">
                    <p className="text-6xl font-extrabold">
                        Помогаем быть здоровыми
                    </p>
                    <p className="text-2xl">
                        Запишем на прием онлайн, вылечим и дадим консультации о
                        поддержании вашей красоты и здоровья
                    </p>
                </div>
                <Search />
            </div>
            <LadyContainer className="flex flex-1 justify-center">
                <Image
                    width={251}
                    height={615}
                    src="/icons/medical-lady-2.svg"
                />
            </LadyContainer>
        </div>
    );
};
const MobileHeader = () => {
    return (
        <div className="flex flex-col lg:hidden px-4">
            <div className="flex-1">
                <div className="">
                    <p className="text-3xl font-bold">
                        Помогаем быть здоровыми
                    </p>
                    <p className="text-lg mt-2">
                        Запишем на прием онлайн, вылечим и дадим консультации о
                        поддержании вашей красоты и здоровья
                    </p>
                </div>
                <div className="pt-4"></div>
                <Search />
            </div>
            <LadyContainer className="flex w-full justify-center mt-8">
                <Image
                    width={250}
                    height={300}
                    src="/icons/medical-lady-2.svg"
                />
            </LadyContainer>
        </div>
    );
};

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    try {
        const { data, error } = await client.query({ query: GET_MAINPAGE });
        console.log(error);
        const specializations = data.getSpecializations;
        const doctors = data.getAllDoctors;

        return {
            props: {
                specializations,
                doctors,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                specializations: [],
                doctors: [],
            },
        };
    }
}
const LadyContainer = styled.div`
    background-image: url("/icons/dna-background-image.svg");
    background-size: contain;
    background-repeat: no-repeat;
`;

export default HomePage;
