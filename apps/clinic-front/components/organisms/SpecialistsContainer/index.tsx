import React from "react";
import { Doctor } from "custom_typings/doctor";
import Carousel from "components/atoms/Carousel";
import { SwiperSlide } from "swiper/react";
import SpecialistContainer from "components/atoms/SpecialistContainer";
import Link from "next/link";

interface SpecialistsContainerProps {
    doctors: Doctor[];
}
const SpecialistsContainer: React.FC<SpecialistsContainerProps> = ({
    doctors,
}) => {
    const doctorsArray = [...doctors];
    const subsitutedDoctors = doctorsArray.splice(2, 5);

    return (
        <div className="">
            <p className="text-3xl lg:text-4xl font-extrabold px-4">
                Наши Специалисты
            </p>
            <div className="">
                <Carousel>
                    {subsitutedDoctors.map((el) => (
                        <SwiperSlide>
                            <SpecialistContainer
                                doctor={el}
                            ></SpecialistContainer>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide>
                        <Link href="/specializations">
                            <div className="flex items-center justify-center rounded-lg shadow-lg w-full h-full cursor-pointer">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xl font-medium text-center w-2/3 mb-4">
                                        Все специалисты клиники Lucem
                                    </span>
                                    <div className="w-14 h-14 flex justify-center items-center rounded-full bg-gray-300">
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
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Carousel>
            </div>
        </div>
    );
};

export default SpecialistsContainer;
