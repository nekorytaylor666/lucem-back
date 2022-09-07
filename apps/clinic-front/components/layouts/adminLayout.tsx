import Link from "next/link";
import React, { ReactElement } from "react";
import DependeciesWrapper from "src/utils/DependeciesWrapper";
import Image from "next/image";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const getAdminLayout = (page: NextPage) => {
    const navLinks = [
        {
            icon: <img src="/icons/nav_inbox.svg" alt="bookings" />,
            label: "Записи",
            to: "/dashboard/",
        },
    ];
    return (
        <div className="drawer drawer-mobile bg-light-pink">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center  min-h-screen p-4">
                <nav className="lg:hidden flex justify-between items-center w-full  mb-4">
                    <label
                        for="my-drawer-2"
                        className="btn btn-outline drawer-button lg:hidden py-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    <Link href="/">
                        <Image
                            width="150"
                            height="60"
                            className=" cursor-pointer"
                            src="/icons/lucem-logo.svg"
                        />
                    </Link>
                </nav>
                <div className="w-full h-full  rounded-lg bg-white p-4 lg:p-8 overflow-y-scroll">
                    {page}
                </div>
            </div>
            <div className="drawer-side ">
                <label for="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-light-pink text-base-content gap-12 ">
                    <Link href="/">
                        <Image
                            width="150"
                            height="60"
                            className=" cursor-pointer"
                            src="/icons/lucem-logo.svg"
                        />
                    </Link>
                    <label
                        for="my-drawer-2"
                        className="btn btn-outline drawer-button lg:hidden py-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    {navLinks.map((el) => (
                        <Link href={`${el.to}`}>
                            <li
                                className={`flex justify-start items-center hover:bg-white text-dark-grey hover:text-purple-500 w-full  p-2 rounded-md`}
                            >
                                <div className="flex items-center justify-start  font-medium cursor-pointer text-lg">
                                    <div className="mr-2">{el.icon}</div>
                                    <span className="flex-1">{el.label}</span>
                                </div>
                            </li>
                        </Link>
                    ))}
                    <Link href="/">
                        <p className="text-dark-grey font-medium cursor-pointer text-lg  text-center">
                            Сайт клиники
                        </p>
                    </Link>
                    <button
                        onClick={() => {
                            signOut();
                        }}
                        className=" text-red-500 font-medium cursor-pointer text-lg  text-center"
                    >
                        Выйти
                    </button>
                </ul>
            </div>
        </div>
    );
    // return (
    //     <div className="bg-light-pink min-h-screen min-w-full container mx-auto">
    //         <section className="grid grid-cols-12 gap-4">
    //             <aside className="col-start-1 col-end-3 flex flex-col items-start py-8">
    //                 <div className="mb-12">
    //                     <Link href="/">
    //                         <Image
    //                             width="200"
    //                             height="100"
    //                             className=" cursor-pointer"
    //                             src="/icons/lucem-logo.svg"
    //                         />
    //                     </Link>
    //                 </div>
    //                 <ul className=" w-full flex flex-col justify-start items-start">
    //                     {navLinks.map((el) => (
    //                         <Link href={`${el.to}`}>
    //                             <li
    //                                 className={`flex justify-start items-center hover:bg-white text-dark-grey hover:text-purple-500 w-full h-full p-2 rounded-md`}
    //                             >
    //                                 <div className="flex items-center justify-start  font-medium cursor-pointer text-lg">
    //                                     <div className="mr-2">{el.icon}</div>
    //                                     <span className="flex-1">
    //                                         {el.label}
    //                                     </span>
    //                                 </div>
    //                             </li>
    //                         </Link>
    //                     ))}
    //                     <Link href="/">
    //                         <p className="text-dark-grey font-medium cursor-pointer text-lg mt-14 text-center">
    //                             Сайт клиники
    //                         </p>
    //                     </Link>
    //                     <button
    //                         onClick={() => {
    //                             signOut();
    //                         }}
    //                         className=" text-red-500 font-medium cursor-pointer text-lg mt-14 text-center"
    //                     >
    //                         Выйти
    //                     </button>
    //                 </ul>
    //             </aside>
    //             <main className="col-start-3 col-span-full max-h-screen py-8">
    //                 <div className="w-full  rounded-lg bg-white p-8 max-h-full overflow-y-scroll">
    //                     {page}
    //                 </div>
    //             </main>
    //         </section>
    //     </div>
    // );
};
export default getAdminLayout;
