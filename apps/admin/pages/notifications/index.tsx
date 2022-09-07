import React, { useEffect } from "react";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import TabsHead from "src/plugins/tab-routing/components/TabsHead";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import Link from "next/link";
import Router from "next/router";

const NotificationsPage = () => {
    useEffect(() => {
        Router.push("notifications?route=all-notifications");
    }, []);
    const routes: TabRoute[] = [
        {
            slug: "all-notifications",
            label: "Все",
            component: <AllNotificationsBody />,
        },
        {
            slug: "doctor-notifications",
            label: "Врачи",
            component: <DoctorNotificationsBody />,
        },
        {
            slug: "patients-notifications",
            label: "Пациенты",
            component: <PatientsNotificationsBody />,
        },
    ];
    const TabBody = useTabRouting({ routes });
    return (
        <div>
            <div>
                <p className="font-bold text-4xl">Уведомления</p>
            </div>
            <div className="p-5 bg-white rounded-xl mt-5">
                <div className="flex justify-between">
                    <div className="">
                        <TabsHead routes={routes}></TabsHead>
                    </div>
                    <div></div>
                </div>
                <div>{TabBody}</div>
            </div>
        </div>
    );
};

const AllNotificationsBody = () => {
    return (
        <div>
            <div className="grid grid-cols-12 my-5">
                <p className="col-start-1 col-end-3 self-center ml-3">Имя</p>
                <p className="col-start-4 col-end-6 self-center ml-5">Статус</p>
                <p className="col-start-6 col-end-8 self-center ml-2">Дата</p>
                <p className="col-start-8 col-end-10 self-center ml-3">
                    Тип запроса
                </p>
                <div className="col-start-10 col-end-13 flex items-start space-x-3">
                    <input
                        type="text"
                        className="p-2 bg-gray-100 rounded focus:outline-none"
                        placeholder="Поиск"
                    />
                    <button className="p-2 bg-gray-100 rounded text-gray-400">
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
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
            </div>
        </div>
    );
};

const DoctorNotificationsBody = () => {
    return (
        <div>
            <div className="grid grid-cols-12 my-5">
                <p className="col-start-1 col-end-3 self-center ml-3">Имя</p>
                <p className="col-start-4 col-end-6 self-center ml-5">Статус</p>
                <p className="col-start-6 col-end-8 self-center ml-2">Дата</p>
                <p className="col-start-8 col-end-10 self-center ml-3">
                    Тип запроса
                </p>
                <div className="col-start-10 col-end-13 flex items-start space-x-3">
                    <input
                        type="text"
                        className="p-2 bg-gray-100 rounded focus:outline-none"
                        placeholder="Поиск"
                    />
                    <button className="p-2 bg-gray-100 rounded text-gray-400">
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
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Врачи"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
            </div>
        </div>
    );
};

const PatientsNotificationsBody = () => {
    return (
        <div>
            <div className="grid grid-cols-12 my-5">
                <p className="col-start-1 col-end-3 self-center ml-3">Имя</p>
                <p className="col-start-4 col-end-6 self-center ml-5">Статус</p>
                <p className="col-start-6 col-end-8 self-center ml-2">Дата</p>
                <p className="col-start-8 col-end-10 self-center ml-3">
                    Тип запроса
                </p>
                <div className="col-start-10 col-end-13 flex items-start space-x-3">
                    <input
                        type="text"
                        className="p-2 bg-gray-100 rounded focus:outline-none"
                        placeholder="Поиск"
                    />
                    <button className="p-2 bg-gray-100 rounded text-gray-400">
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
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="space-y-2">
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
                <NotificationCard
                    name="Ахметолдинов Азамат"
                    status="Пациенты"
                    date="24.08.2021"
                    requestType="Запись к врачу"
                />
            </div>
        </div>
    );
};

interface AllNotificationsProps {
    name: String;
    status: String;
    date: String;
    requestType: String;
}

const NotificationCard: React.FC<AllNotificationsProps> = ({
    name,
    status,
    date,
    requestType,
}) => {
    return (
        <ElevatedContainer className="rounded">
            <div className="px-3 py-4 grid grid-col-12 bg-white cursor-pointer rounded">
                <p className="col-start-1 col-end-3 self-center">{name}</p>
                <p className="col-start-3 col-end-5 self-center">{status}</p>
                <p className="col-start-5 col-end-7 self-center">{date}</p>
                <p className="col-start-7 col-end-13 self-center text-coral-red">
                    {requestType}
                </p>
            </div>
        </ElevatedContainer>
    );
};

export default NotificationsPage;
