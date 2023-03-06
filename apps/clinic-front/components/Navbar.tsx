import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
    light?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ light }) => {
    return (
        <>
            <DesktopNavbar light={light}></DesktopNavbar>
            <MobileNavbar light={light}></MobileNavbar>
        </>
    );
};

const DesktopNavbar: React.FC<NavbarProps> = ({ light }) => {
    const logoSrc = light ? "/icons/light-logo.svg" : "/icons/lucem-logo.svg";
    const { data: user } = useSession({
        required: false,
    });
    const isAuth = user?.accessToken;
    const fullname = user?.user?.name;

    return (
        <div
            className={`hidden container lg:flex py-8 justify-between ${
                light && "text-white"
            }`}
        >
            <Link href="/">
                <div className=" cursor-pointer flex items-stretch w-64">
                    <Image
                        height={140}
                        width={230}
                        src={logoSrc}
                        className="self-start"
                    ></Image>
                </div>
            </Link>
            <div className="text-lg space-x-4 pt-4">
                {/* <Link href="/disease">
                    <span className="font-medium hover:text-pink-purple cursor-pointer hover:bg-gradient-pink py-2 px-6 rounded-full transition-all ease-in-out">
                        Врачи
                    </span>
                </Link> */}
                <Link href="/specializations">
                    <span className="font-medium hover:text-pink-purple cursor-pointer hover:bg-gradient-pink py-2 px-6 rounded-full transition-all ease-in-out">
                        Врачи
                    </span>
                </Link>
                {/* <Link href="/about">
                    <span className="font-medium hover:text-pink-purple cursor-pointer hover:bg-gradient-pink py-2 px-6 rounded-full transition-all ease-in-out">
                        О клинике
                    </span>
                </Link> */}
            </div>
            <div className="flex items-end flex-col space-y-1 pt-4 ">
                {isAuth ? (
                    <div className="flex flex-col gap-2">
                        <Link href="/dashboard/">
                            <span className="bg-main-gray text-pink-purple py-2 px-8 rounded-md text-sm  cursor-pointer hover:bg-pink-purple hover:text-main-gray">
                                Войти в личный кабинет
                            </span>
                        </Link>
                        <button
                            onClick={() => signOut()}
                            className="bg-main-gray text-red-500 py-2 px-8 rounded-md text-sm  cursor-pointer hover:bg-pink-purple hover:text-main-gray"
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                ) : (
                    <Link href="/dashboard/signin">
                        <span className="bg-main-gray text-pink-purple py-2 px-8 rounded-md text-sm  cursor-pointer hover:bg-pink-purple hover:text-main-gray">
                            Войти в личный кабинет
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export const NavButton = styled.div`
    box-shadow: 1px 2px 5px rgba(98, 0, 192, 0.15);
    border-radius: 6px;
    height: 40px;
`;

const MobileNavbar: React.FC<NavbarProps> = ({ light }) => {
    const logoSrc = light ? "/icons/light-logo.svg" : "/icons/lucem-logo.svg";

    return (
        <div
            className={`lg:hidden container flex flex-col items-center   justify-between p-6 ${
                light && "text-white"
            }`}
        >
            <div className="w-full flex justify-between items-center">
                <a href="tel:123-456-7890">
                    <PhoneIcon></PhoneIcon>
                </a>
                <Link href="/">
                    <div className=" cursor-pointer flex justify-center items-stretch w-64">
                        <Image height={50} width={105} src={logoSrc}></Image>
                    </div>
                </Link>
                <Link href="/dashboard/signin">
                    <UserIcon></UserIcon>
                </Link>
            </div>
            <div className="grid grid-cols-3 w-full gap-2 mt-4">
                <Link href="/disease">
                    <NavButton className="w-full py-2 font-medium flex justify-center items-center">
                        Врачи
                    </NavButton>
                </Link>
                <Link href="/specializations">
                    <NavButton className="w-full font-medium flex justify-center items-center">
                        Услуги
                    </NavButton>
                </Link>
                <Link href="/about">
                    <NavButton className="w-full font-medium flex justify-center items-center">
                        О нас
                    </NavButton>
                </Link>
            </div>
        </div>
    );
};

const PhoneIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
    </svg>
);

const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);

export default Navbar;
