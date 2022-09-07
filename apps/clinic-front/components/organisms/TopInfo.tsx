import React from "react";
import Search from "components/atoms/Search";
import Image from "next/image";
import styled from "styled-components";
import Navbar from "components/Navbar";

const TopInfo = () => {
    return (
        <div className="bg-white rounded-3xl shadow-md">
            <div className="container">
                <Navbar />
                <div className="my-10">
                    <div className="flex pb-10 items-center">
                        <div className="flex-1 space-y-10 p-4">
                            <Search />
                            <div className="space-y-4">
                                <p className="text-3xl lg:text-6xl font-extrabold">
                                    Наши врачи
                                </p>
                                <p className="text-lg font-medium text-dark-grey">
                                    Полный список врачей клиники Lucem,
                                    воспользуйтесь поиском для удобной навигации
                                    среди докторов.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 space-y-8 hidden lg:block lg:container">
                            <LadyContainer className="flex justify-center items-start">
                                <img
                                    className=" h-96"
                                    width={251}
                                    height={615}
                                    src="/icons/medical-lady-2.svg"
                                />
                            </LadyContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LadyContainer = styled.div`
    background-image: url("/icons/dna-background-image.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

export default TopInfo;
