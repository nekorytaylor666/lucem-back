import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

interface Props {
    show: boolean;
    setShow: any;
}

const AppointmentModal = ({ show, setShow }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [appointmentData, setAppointmentData] = useState({
        f_name: "",
        s_name: "",
        b_date: "",
        createdAt: "8 июня, четверг, 13:00",
        number: "",
    });
    const [smsCode, setSmsCode] = useState("");
    const [appointmentSent, setAppointmentSent] = useState(false);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        if (seconds > 0 && appointmentSent) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
    });

    const closeModal = (e: any) => {
        if (modalRef.current === e.target) {
            setShow(false);
        }
    };

    return (
        <>
            {show ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <motion.div
                        style={{
                            height: "100%",
                            width: "99%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        animate={{ y: [0, -20, 0], opacity: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <StyledModalContainer className="py-8 px-6 bg-gray-100 rounded-2xl w-5/12 space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-3xl font-bold">
                                        Запись на прием
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                    >
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
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 flex flex-col items-center">
                                    <Image
                                        width={216}
                                        height={163}
                                        src="/images/doctor.png"
                                        className="self-start object-contain object-bottom "
                                    />
                                    <div className="flex justify-center mt-4">
                                        <div className="flex space-x-2">
                                            <Image
                                                height={24}
                                                width={24}
                                                src="/icons/star.svg"
                                            />
                                            <Image
                                                height={24}
                                                width={24}
                                                src="/icons/star.svg"
                                            />
                                            <Image
                                                height={24}
                                                width={24}
                                                src="/icons/star.svg"
                                            />
                                            <Image
                                                height={24}
                                                width={24}
                                                src="/icons/star.svg"
                                            />
                                            <Image
                                                height={24}
                                                width={24}
                                                src="/icons/star.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col items-center">
                                    <div>
                                        <p className="text-dark-grey">
                                            Кардиолог
                                        </p>
                                        <p className="text-xl font-bold">
                                            Рыспаева Алия Шаяхметовна
                                        </p>
                                        <p>
                                            Стаж 33 года | Врач высшей категории
                                            | Кандидат медицинских наук
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <p className="text-xl text-dark-grey">
                                    Стоимость приема: 6000тг.
                                </p>
                            </div>
                            <div className="space-y-4">
                                {/* <div className="space-y-2">
                                <p className="text-dark-grey">
                                    Дата и время приема
                                </p>
                                <input
                                    type="text"
                                    className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                    value="8 июня, четверг, 13:00"
                                />
                            </div> */}
                                <div className="flex space-x-2">
                                    <div className="flex-1 space-y-2">
                                        <p className="text-dark-grey">
                                            Имя пациента
                                        </p>
                                        <input
                                            type="text"
                                            className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                            placeholder="Имя"
                                            value={appointmentData.f_name}
                                            onChange={(e) =>
                                                setAppointmentData(
                                                    Object.assign(
                                                        {},
                                                        appointmentData,
                                                        {
                                                            f_name: e.target
                                                                .value,
                                                        },
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="text-dark-grey">
                                            Фамилия пациента
                                        </p>
                                        <input
                                            type="text"
                                            className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                            placeholder="Фамилия"
                                            value={appointmentData.s_name}
                                            onChange={(e) =>
                                                setAppointmentData(
                                                    Object.assign(
                                                        {},
                                                        appointmentData,
                                                        {
                                                            s_name: e.target
                                                                .value,
                                                        },
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div className="flex-1 space-y-2">
                                        <p className="text-dark-grey">
                                            Дата рождения пациента
                                        </p>
                                        <input
                                            type="text"
                                            className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                            placeholder="дд-мм-гггг"
                                            value={appointmentData.b_date}
                                            onChange={(e) =>
                                                setAppointmentData(
                                                    Object.assign(
                                                        {},
                                                        appointmentData,
                                                        {
                                                            b_date: e.target
                                                                .value,
                                                        },
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="text-dark-grey">
                                            Дата и время приема
                                        </p>
                                        <input
                                            type="text"
                                            className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                            value={appointmentData.createdAt}
                                            onChange={(e) =>
                                                setAppointmentData(
                                                    Object.assign(
                                                        {},
                                                        appointmentData,
                                                        {
                                                            createdAt:
                                                                e.target.value,
                                                        },
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-dark-grey">
                                        Телефон для подтверждения записи
                                    </p>
                                    <input
                                        type="text"
                                        className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                        placeholder="+7 ("
                                        value={appointmentData.number}
                                        onChange={(e) =>
                                            setAppointmentData(
                                                Object.assign(
                                                    {},
                                                    appointmentData,
                                                    {
                                                        number: e.target.value,
                                                    },
                                                ),
                                            )
                                        }
                                    />
                                    <p className="text-dark-grey text-sm">
                                        На этот номер вам придет SMS с кодом
                                        подтверждения
                                    </p>
                                </div>
                                {appointmentSent ? (
                                    <div>
                                        <p className="text-pink-purple text-sm">
                                            Отправить еще раз через{" "}
                                            <span>{seconds}</span> секунд
                                        </p>
                                        <p className="text-dark-grey">
                                            Код из SMS
                                        </p>
                                        <div className="flex space-x-2">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                                    value={smsCode}
                                                    onChange={(e) =>
                                                        setSmsCode(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Link href="/success">
                                                    <button className="bg-pink-purple w-full px-2 py-3 text-white rounded">
                                                        Подтвердить
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            className="bg-pink-purple w-full px-2 py-3 text-white rounded"
                                            onClick={() =>
                                                setAppointmentSent(
                                                    !appointmentSent,
                                                )
                                            }
                                        >
                                            Отправить код подтверждения
                                        </button>
                                    </div>
                                )}
                            </div>
                        </StyledModalContainer>
                    </motion.div>
                </Background>
            ) : null}
        </>
    );
};

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`;

const StyledModalContainer = styled.div`
    position: relative;
    z-index: auto;
`;

export default AppointmentModal;
