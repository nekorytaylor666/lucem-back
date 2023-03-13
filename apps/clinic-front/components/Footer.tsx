import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 w-full  py-10 px-6 text-sm lg:text-base gap-4">
                <div className="space-y-4 w-2/6">
                    <p>Клиника</p>
                    <ul className="text-dark-grey cursor-pointer space-y-1">
                        <Link href="/about">
                            <li className="hover:text-black">О нас</li>
                        </Link>
                        <Link href="/specializations">
                            <li className="hover:text-black">Услуги</li>
                        </Link>
                        <Link href="/disease">
                            <li className="hover:text-black">Врачи</li>
                        </Link>
                    </ul>
                </div>
                <div className="space-y-4 w-2/6">
                    <p>Пациенту</p>
                    <ul className="text-dark-grey cursor-pointer space-y-1">
                        <li className="hover:text-black">Личный кабинет</li>
                        <Link href="/dashboard/signin">
                            <li className="hover:text-black">Регистрация</li>
                        </Link>
                        <li className="hover:text-black">
                            Согласие на обработку персональных данных
                        </li>
                        <li className="hover:text-black">Конфиденциальность</li>
                    </ul>
                </div>
                <div className="flex flex-col items-center w-2/6">
                    <div className="space-y-4">
                        <p>Врачу</p>
                        <ul className="text-dark-grey cursor-pointer space-y-1">
                            <a href="http://94.247.128.224:3002/login">
                                <li className="hover:text-black">
                                    Личный кабинет
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
                <Link href="/">
                    <div className="flex-1 space-y-4">
                        <Image
                            height={140}
                            width={230}
                            src="/icons/lucem-logo.svg"
                            className="self-start"
                        />
                        <div>
                            <p>
                                Пишите нам на{" "}
                                <span className="text-pink-purple">
                                    info@lucem.kz
                                </span>
                            </p>
                            <p>
                                Звоните на
                                <a
                                    className="text-pink-purple"
                                    href="tel:+77081097577"
                                >
                                    <span>+7 705 297 23 79</span>
                                </a>
                            </p>
                        </div>
                        <p className="text-dark-grey">© ТОО «Lucem», 2021</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Footer;
