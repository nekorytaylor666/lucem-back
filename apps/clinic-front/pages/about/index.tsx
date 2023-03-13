import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import Navbar from "components/Navbar";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Footer from "components/Footer";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: "/images/interior/dr_room.jpg",
        thumbnail: "/images/interior/dr_room.jpg",
        originalClass: "border-radius: 10px;",
        thumbnailClass: "border-radius: 8px;",
        originalHeight: 680,
        originalWidth: 920,
        thumbnailHeight: 234,
        thumbnailWidth: 316,
        description: "Ресепшн",
    },
    {
        original: "/images/interior/reception_room.jpg",
        thumbnail: "/images/interior/reception_room.jpg",
        originalClass: "border-radius: 10px;",
        thumbnailClass: "border-radius: 8px;",
        originalHeight: 680,
        originalWidth: 920,
        thumbnailHeight: 234,
        thumbnailWidth: 316,
        description: "Ресепшн и зал ожидания",
    },
    {
        original: "/images/interior/cosmetology.jpg",
        thumbnail: "/images/interior/cosmetology.jpg",
        originalClass: "border-radius: 10px;",
        thumbnailClass: "border-radius: 8px;",
        originalHeight: 680,
        originalWidth: 920,
        thumbnailHeight: 234,
        thumbnailWidth: 316,
        description: "Кабинет косметолога",
    },
    // {
    //     original: "/images/interior/cafe.png",
    //     thumbnail: "/images/interior/cafe.png",
    //     originalClass: "border-radius: 10px;",
    //     thumbnailClass: "border-radius: 8px;",
    //     originalHeight: 680,
    //     originalWidth: 920,
    //     thumbnailHeight: 234,
    //     thumbnailWidth: 316,
    //     description: "Кофетерий",
    // },
    // {
    //     original: "/images/interior/aisle.png",
    //     thumbnail: "/images/interior/aisle.png",
    //     originalClass: "border-radius: 10px;",
    //     thumbnailClass: "border-radius: 8px;",
    //     originalHeight: 680,
    //     originalWidth: 920,
    //     thumbnailHeight: 234,
    //     thumbnailWidth: 316,
    //     description: "Коридор",
    // },
];

const AboutPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className=" container p-4">
                <div className="">
                    <div>
                        <AboutContainer className="rounded-xl p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:flex-row gap-8">
                                <div className="flex-col">
                                    <div className="mb-6">
                                        <p className="text-4xl font-bold">
                                            О клинике
                                        </p>
                                    </div>
                                    <div className="text-sm lg:text-lg font-normal space-y-8 ">
                                        <p>
                                            Предоставляем полный спектр услуг по
                                            диагностике, лечению и профилактике
                                            болезней, используем современное
                                            диагностическое оборудование.
                                        </p>
                                        <p>
                                            Lucem объединяет специалистов
                                            основных направлений, таких как:
                                            аллергологи, гастроэнтерологи,
                                            гинекологи, дерматологи, кардиологи,
                                            мануальные терапевты, офтальмологи,
                                            неврологи, урологи, эндокринологи,
                                            оториноларингологи, травматологи.
                                        </p>
                                        <p>
                                            Наши пациенты ценят высокое качество
                                            медицинских услуг, большой опыт и
                                            знания врачей и их умение понятным
                                            языком объяснить сложные медицинские
                                            процессы, за возможность пройти все
                                            исследования в одном месте и
                                            получить назначения, основанные на
                                            принципах доказательной медицины.
                                        </p>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="text-xl font-normal space-y-8">
                                        <AboutRegistry className="space-y-2">
                                            <div className="space-y-1 mb-3">
                                                <p className="text-dark-grey font-normal text-lg lg:text-2xl mb-2">
                                                    Регистратура
                                                </p>
                                                <div>
                                                    <a href="tel:+77081097577">
                                                        <p className="font-normal text-xl lg:text-3xl">
                                                            +77081097577
                                                            <div className="border-b border-solid border-gray-400 w-7/12"></div>
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                                <Link href="https://www.instagram.com/lucem_medical_clinic/">
                                                    <div className="w-full flex py-1 px-5 space-x-2 border-2 border-pink-purple rounded-md cursor-pointer items-center">
                                                        <Image
                                                            width={30}
                                                            height={30}
                                                            src="/icons/ig_vector.svg"
                                                            className="block"
                                                        />
                                                        <p className="pt-2 text-pink-purple text-base lg:text-xl font-medium">
                                                            Instagram
                                                        </p>
                                                    </div>
                                                </Link>
                                                <Link href="https://api.whatsapp.com/send/?phone=77028196393&text&app_absent=0">
                                                    <div className="w-full flex py-1 px-5 space-x-2 border-2 border-special-green rounded-md cursor-pointer items-center">
                                                        <Image
                                                            width={30}
                                                            height={30}
                                                            src="/icons/whatsapp_vector.svg"
                                                            className="block"
                                                        />
                                                        <p className="pt-2 text-special-green text-base lg:text-xl font-medium">
                                                            WhatsApp
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </AboutRegistry>
                                        <InfoPapars className="flex flex-row space-x-4 px-6 rounded">
                                            <img
                                                className=""
                                                src="/icons/Time.svg"
                                            />
                                            <p className="text-lg py-4">
                                                Работаем с 8:00 до 22:00
                                                ежедневно, без праздников и
                                                выходных
                                            </p>
                                        </InfoPapars>
                                        <InfoPapars className="flex flex-row space-x-4 px-6 rounded">
                                            <img
                                                src="/icons/location.svg"
                                                alt=""
                                            />
                                            <div className="flex-col py-4">
                                                <p className="text-lg">
                                                    г. Нур-султан, ул. Аманат,
                                                    2, район Алматы, м-н
                                                    Караоткель,
                                                </p>
                                                <p className="text-sm text-pink-purple">
                                                    Смотреть на карте
                                                </p>
                                            </div>
                                        </InfoPapars>
                                    </div>
                                </div>
                            </div>
                        </AboutContainer>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-10 ">
                    <div className="w-full p-4 lg:p-8 bg-gray-100 space-y-3 rounded">
                        <img src="/icons/patient.svg" className="w-12 mb-3" />
                        <p className="text-2xl lg:text-5xl font-bold">3000</p>
                        <p className=" text-base lg:text-xl font-normal">
                            пациентов ежемесячно
                        </p>
                    </div>
                    <div className="w-full p-4 lg:p-8 bg-gray-100 space-y-3 rounded">
                        <img
                            src="/icons/medical-team.svg"
                            className="w-12 mb-3"
                        />
                        <p className="text-2xl lg:text-5xl font-bold">78</p>
                        <p className=" text-base lg:text-xl font-normal">
                            врачей
                        </p>
                    </div>
                    <div className="w-full p-4 lg:p-8 bg-gray-100 space-y-3 rounded">
                        <img src="/icons/caduceus.svg" className="w-12 mb-3" />
                        <p className="text-2xl lg:text-5xl font-bold">11</p>
                        <p className=" text-base lg:text-xl font-normal">
                            направлений
                        </p>
                    </div>
                    <div className="w-full p-4 lg:p-8 bg-gray-100 space-y-3 rounded">
                        <img src="/icons/group.svg" className="w-12 mb-3" />
                        <p className="text-2xl lg:text-5xl font-bold">4</p>
                        <p className=" text-base lg:text-xl font-normal">
                            года работы
                        </p>
                    </div>
                </div>
                <div className="space-y-12 lg:space-y-24  mb-12">
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2  gap-4 lg:gap-12 mt-4 px-0"
                        id="equipment"
                    >
                        <div>
                            <img
                                src="/images/equipment.png"
                                alt=""
                                className="block"
                            />
                        </div>
                        <div className="self-center space-y-4 lg:space-y-6">
                            <h1 className="text-2xl lg:text-5xl font-bold ">
                                Оборудование
                            </h1>
                            <p className=" text-base lg:text-xl font-normal">
                                Первый корпус клиники построен в 2017 году,
                                новый большой корпус будет построен к концу 2021
                                года. При их строительстве и оснащении
                                использовались современные технологии и
                                материалы, чтобы соответствовать всем
                                международным требованиям в области
                                здравоохранения.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <p className="text-2xl lg:text-5xl font-bold">
                            Интерьер
                        </p>
                        <ImageGallery items={images} />
                    </div>
                </div>
                <div className="my-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                        <div className="flex-1 flex-col space-y-4">
                            <div className="text-2xl lg:text-5xl font-bold">
                                Врачи
                            </div>
                            <div className="">
                                <p className="text-base lg:text-xl">
                                    Какими бы комфортными не были условия,
                                    пациент приходит к врачу. Какой бы умной и
                                    точной не была техника, расшифровать
                                    результат, взять ответственность и принять
                                    решение в каждом конкретном случае может
                                    только опытный и надежный доктор.{" "}
                                </p>
                            </div>
                            <p className="text-2xl font-semibold">
                                Команда Lucem
                            </p>
                            <div>
                                <ul className="list-disc text-base lg:text-xl">
                                    <li className="ml-8">
                                        Врачи высшей категории
                                    </li>
                                    <li className="ml-8">
                                        Врачи первой квалификационной категории
                                    </li>
                                    <li className="ml-8">
                                        Отличники здравоохранения
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center">
                            <img src="/images/doctors/doctors.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="space-y-10">
                    <div className="rounded-lg h-96">
                        <YMaps>
                            <div className="w-full rounded-lg h-96">
                                <Map
                                    className="w-full h-full"
                                    state={{
                                        center: [51.1426652, 71.4808272],
                                        zoom: 18,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Placemark
                                        geometry={[51.1426652, 71.4808272]}
                                    />
                                </Map>
                            </div>
                        </YMaps>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-6 bg-gray-100 rounded-xl">
                        <div className="flex flex-1 items-center">
                            <p className="text-4xl font-bold">
                                Lucem всегда рядом
                            </p>
                        </div>
                        <div className="flex flex-1 justify-start">
                            <div>
                                <p>Аманат 2, г.Нурсултан,</p>
                                <p>район Алматы, м-н Каратекель,</p>
                                <p>Почтовый индекс: Z00D5F4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;

const AboutContainer = styled.div`
    /* margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 46px;
    padding: 60px 100px; */
    background-color: #ffffff;
    color: black;
    border-radius: 20px;
    box-shadow: -10px 10px 20px 20px rgba(110, 1, 215, 0.1);
`;

const AboutRegistry = styled.div``;

const InfoPapars = styled.div`
    background-color: #f7f7f7;
    color: black;
`;
