import Link from "next/link";
import React, { ReactElement } from "react";
import Image from "next/image";

const getAdminLayout = (page: ReactElement) => {
    const navLinks = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            ),
            label: "Статистика",
            to: "finance",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
            ),
            label: "Сотрудники",
            to: "staff",
        },

        {
            icon: (
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            ),
            label: "Пациенты",
            to: "patients",
        },
        {
            icon: (
                <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                />
            ),
            label: "Услуги",
            to: "services",
        },
    ];
    return (
        <div className="bg-light-pink min-h-screen min-w-full container mx-auto">
            <section className="grid grid-cols-12 gap-4">
                <aside className="col-start-1 col-end-3 flex flex-col items-start py-8">
                    <div className="mb-12">
                        <Image
                            width="200"
                            height="100"
                            src="/icons/lucem-logo.svg"
                        />
                    </div>
                    <ul className=" w-full flex flex-col justify-start items-start">
                        {navLinks.map((el) => (
                            <Link href={`/${el.to}`}>
                                <li
                                    className={`flex justify-start items-center hover:bg-white text-dark-grey hover:text-purple-500 w-full h-full p-2 rounded-md`}
                                >
                                    <div className="flex items-center justify-start  font-medium cursor-pointer text-lg">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 mr-2 "
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            {el.icon}
                                        </svg>
                                        <span className="flex-1">
                                            {el.label}
                                        </span>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </aside>
                <main className="col-start-3 col-span-full max-h-screen py-8">
                    <div className="w-full  rounded-lg p-8 max-h-full bg-white overflow-y-scroll">
                        {page}
                    </div>
                </main>
            </section>
        </div>
    );
};
export default getAdminLayout;
