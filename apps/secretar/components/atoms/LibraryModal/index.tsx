import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
    show: boolean;
    setShow: any;
}

const LibraryModal = ({ show, setShow }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

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
                        <StyledModalContainer className="py-8 px-6 bg-white rounded-2xl w-5/12 space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-3xl font-bold">
                                        Гинекология - новая заметка
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
                            <div>
                                <p>10.09.2021 11:30</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Название</p>
                                <div className="bg-gray-100 py-2 px-3">
                                    <p>
                                        Васильев - все вопросы гинекологии
                                        2020г.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400">Загрузка</p>
                                <div className="bg-gray-100 py-10 px-5">
                                    <p>
                                        Перетащите файл сюда или нажмите для
                                        выбора файла с устройства
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-400">Ссылка на файл</p>
                                <input
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-pink-purple py-2 px-5 rounded text-white">
                                    Добавить
                                </button>
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

export default LibraryModal;
