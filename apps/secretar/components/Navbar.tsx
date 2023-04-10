import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
    light?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ light }) => {
    const logoSrc = light ? "/icons/light-logo.svg" : "/icons/lucem-logo.svg";
    return (
        <div
            className={`container flex py-8 justify-between ${
                light && "text-white"
            }`}
        >
            <Link href="/">
                <div className="flex items-stretch w-64">
                    <Image
                        height={140}
                        width={230}
                        src={logoSrc}
                        className="self-start"
                    ></Image>
                </div>
            </Link>
            <div className="text-lg space-x-10 pt-4">
                <Link href="/disease">
                    <span className="font-medium hover:text-pink-purple cursor-pointer">
                        Врачи
                    </span>
                </Link>
                <Link href="/specializations">
                    <span className="font-medium hover:text-pink-purple cursor-pointer">
                        Услуги
                    </span>
                </Link>
                <button className="font-medium hover:text-pink-purple">
                    О клинике
                </button>
            </div>
            <div className="flex items-end flex-col space-y-1 pt-4">
                <p className="text-3xl font-semibold">+7 708 109 75 77</p>
                <button className="bg-main-gray text-pink-purple py-2 px-4 rounded-md text-sm w-3/4">
                    Личный кабинет
                </button>
            </div>
        </div>
    );
};

export default Navbar;
