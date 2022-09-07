import Link from "next/link";
import React, { ReactElement } from "react";
import DependeciesWrapper from "src/utils/DependeciesWrapper";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { currentSessionsState } from "../../src/recoil/atoms/currentSession/index";
import { signOut } from "@src/utils/signOut";

const getAdminLayout = (page: ReactElement) => {
  const navLinks = [
    {
      icon: (
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      ),
      label: "Главная",
      to: "",
    },
    {
      icon: (
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      ),
      label: "Расписание",
      to: "calendar",
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
      label: "Финансы",
      to: "finance",
    },
    {
      icon: (
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      ),
      label: "Настройки",
      to: "settings",
    },
  ];
  return (
    <div className="bg-light-pink min-h-screen min-w-full container mx-auto">
      <section className="grid grid-cols-12 gap-4">
        <aside className="col-start-1 col-end-3 flex flex-col items-start py-8">
          <div className="mb-12">
            <Image width="200" height="100" src="/icons/lucem-logo.svg" />
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
                    <span className="flex-1">{el.label}</span>
                  </div>
                </li>
              </Link>
            ))}
            <button
              onClick={() => signOut()}
              className={`flex justify-start items-center hover:bg-white text-dark-grey hover:text-red-500 w-full h-full p-2 rounded-md`}
            >
              <div className="flex items-center justify-start  font-medium cursor-pointer text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1">Выйти</span>
              </div>
            </button>
          </ul>
        </aside>
        <main className="col-start-3 col-span-full max-h-screen py-8">
          <div className="w-full  rounded-lg bg-white p-8 max-h-full overflow-y-scroll">
            {page}
          </div>
        </main>
      </section>
    </div>
  );
};
export default getAdminLayout;
