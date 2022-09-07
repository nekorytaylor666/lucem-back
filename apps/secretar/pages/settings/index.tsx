import React from "react";
import getAdminLayout from "components/layouts/adminLayout";

const SettingsPage = () => {
    return (
        <div>
            <div className="flex">
                <p className="text-3xl font-bold">Настройки</p>
            </div>
            <hr className="my-3" />
            <div className="space-y-2">
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-end-5">
                        <p className="text-gray-400">Электронная почта</p>
                    </div>
                    <div className="col-start-5 col-end-10">
                        <p>olzhas.bjsmbj4@lucem.kz</p>
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-end-5">
                        <p className="text-gray-400">Телефон</p>
                    </div>
                    <div className="col-start-5 col-end-10">
                        <p>+7 702 382 24 61</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DayCard = () => {
    return (
        <div className="flex flex-col items-center space-y-3 pt-3">
            <p className="text-gray-400 text-sm">Понедельник</p>
            <div className="flex flex-col bg-daily-green text-white w-36 h-36 p-5 justify-center items-center rounded">
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
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <p>Работаете</p>
                <p>08:00 - 21:00</p>
            </div>
        </div>
    );
};

export default SettingsPage;
