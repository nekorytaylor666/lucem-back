import React, { useState } from "react";
import { AppointmentTimetable } from "../../molecules/AppointmentTimeTable";
interface Props {
    showModal: boolean;
    setShowModal: any;
}

const DoctorContainer = ({ showModal, setShowModal }: Props) => {
    return (
        <div className="rounded-2xl grid grid-cols-3 bg-white shadow-lg my-5">
            <div className="flex flex-col flex-1 items-start pt-8">
                <div className="px-8">
                    <div className="flex p-2 rounded-full bg-gray-100 items-center justify-items-center cursor-pointer">
                        <svg
                            width="20"
                            height="18"
                            viewBox="0 0 30 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.27247 4.40101C1.51578 7.1577 1.51579 11.6272 4.27247 14.3839L14.9648 25.0762L15.0383 25.0027L15.1119 25.0763L25.8042 14.384C28.5609 11.6273 28.5609 7.15779 25.8042 4.4011C23.0475 1.64441 18.578 1.64442 15.8213 4.4011L15.4693 4.75309C15.2313 4.99111 14.8454 4.99111 14.6074 4.75309L14.2553 4.40101C11.4986 1.64432 7.02916 1.64432 4.27247 4.40101Z"
                                stroke="#2B2B2B"
                                strokeWidth="2.43792"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <img width={580} height={502} src="/icons/specialist.svg" />
            </div>
            <div className="py-8 space-y-5">
                <div>
                    <p className="text-3xl font-bold">
                        Башанкаев Бадма Николаевич
                    </p>
                    <p className="text-lg text-gray-400">
                        Руководитель центра окушерства и гинекологии, Ведущий
                        специалист
                    </p>
                </div>
                <div>
                    <p className="font-semibold">20 лет</p>
                    <p>Опыт работы</p>
                </div>
                <div>
                    <p className="text-special-green font-semibold">9.2 / 10</p>
                    <p>Рейтинг на основе 212 отзывов</p>
                </div>
                <div>
                    <p className="text-3xl font-bold">6000 тг</p>
                    <p>Стоимость первичного приема</p>
                </div>
            </div>
            <div className="py-8 pr-8 space-y-2">
                <AppointmentTimetable
                    showModal={showModal}
                    setShowModal={setShowModal}
                ></AppointmentTimetable>
            </div>
        </div>
    );
};

export default DoctorContainer;
