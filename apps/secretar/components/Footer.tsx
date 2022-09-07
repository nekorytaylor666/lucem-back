import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="container flex mt-10 py-10">
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
                        <span className="text-pink-purple">info@lucem.kz</span>
                    </p>
                    <p>
                        Звоните на{" "}
                        <span className="text-pink-purple">
                            +7 705 297 23 79
                        </span>
                    </p>
                </div>
                <p className="text-dark-grey">© ТОО «Lucem», 2021</p>
            </div>
            <div className="flex flex-1 pt-2">
                <div className="space-y-4 w-2/6">
                    <p>Клиника</p>
                    <ul className="text-dark-grey cursor-pointer space-y-1">
                        <li className="hover:text-black">О нас</li>
                        <li className="hover:text-black">Услуги</li>
                        <li className="hover:text-black">Врачи</li>
                        <li className="hover:text-black">Вакансии</li>
                        <li className="hover:text-black">Контакты</li>
                        <li className="hover:text-black">Партнерам</li>
                    </ul>
                </div>
                <div className="space-y-4 w-2/6">
                    <p>Пациенту</p>
                    <ul className="text-dark-grey cursor-pointer space-y-1">
                        <li className="hover:text-black">Личный кабинет</li>
                        <li className="hover:text-black">Регистрация</li>
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
                            <li className="hover:text-black">Личный кабинет</li>
                            <li className="hover:text-black">Регистрация</li>
                            <li className="hover:text-black">Вакансии</li>
                            <li className="hover:text-black">Контакты</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
