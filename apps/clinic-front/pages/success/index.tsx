import React from "react";
import styled from "styled-components";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Success = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container flex">
                <div className="flex flex-1 flex-col justify-center">
                    <p className="text-4xl font-bold">Вы записаны на прием!</p>
                    <p className="text-xl">
                        Информация отправлена вам на телефон и добавлена в
                        календарь
                    </p>
                </div>
                <div className="flex-1">
                    <LadyContainer className="flex justify-center items-start">
                        <img
                            width={251}
                            height={615}
                            src="/icons/medical-lady-2.svg"
                        />
                    </LadyContainer>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

const LadyContainer = styled.div`
    background-image: url("/icons/dna-background-image.svg");
    background-size: contain;
    background-repeat: no-repeat;
`;

export default Success;
