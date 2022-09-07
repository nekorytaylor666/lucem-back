import React from "react";
import styled from "styled-components";
import Image from "next/image";

const ApproachContainer = () => {
    return (
        <MainBlock className="text-white p-2 lg:mb-64">
            <div className="flex flex-col py-10 pt-10 px-4 lg:px-10 lg:pb-64 rounded-2xl bg-gradient-to-r from-pink-purple to-light-purple">
                <div className="flex-1">
                    <p className="lg:text-5xl text-3xl font-extrabold">
                        Меняем подход к медицине
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-sm lg:text-lg mt-4">
                    <div className="flex-1 space-y-2">
                        <p className="font-bold">
                            Электронная медицинская карта
                        </p>
                        <p>
                            Ваша полная история болезни, формируемая из всех
                            визитов в Lucem. С возможностью экспорта в любом
                            удобном виде.
                        </p>
                    </div>
                    <div className="flex-1 space-y-2 ">
                        <p className="font-bold">Дневник здоровья</p>
                        <p>
                            Персональные рекомендации о поддержании здоровья,
                            напоминания о вашем курсе лечения интегрированное в
                            календарь на ваших устройствах
                        </p>
                    </div>
                    <LaptopBlock className="hidden lg:h-96 relative lg:flex justify-center items-center w-full">
                        <img
                            className="w-full  absolute top-0"
                            src="/icons/laptop1.png"
                        />
                    </LaptopBlock>
                </div>
                <img className="lg:hidden w-full" src="/icons/laptop1.png" />
            </div>
        </MainBlock>
    );
};

const MainBlock = styled.div`
    position: relative;
`;

const LaptopBlock = styled.div``;

export default ApproachContainer;
