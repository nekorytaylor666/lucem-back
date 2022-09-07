import React from "react";
import getAdminLayout from "components/layouts/adminLayout";

const SettingsPage = () => {
    return (
        <div>
            <div className="flex">
                <p className="text-4xl font-bold">Настройки</p>
            </div>
            <div className="bg-white p-5 mt-5 rounded-xl">
                <div className="space-y-2">
                    <div className="grid grid-cols-12">
                        <div className="col-start-1 col-end-5">
                            <p className="text-gray-400">Электронная почта</p>
                        </div>
                        <div className="col-start-5 col-end-10">
                            <p>olzhas.bjsmbj4@lucem.kz</p>
                        </div>
                        <div className="flex justify-end col-start-10 col-end-13">
                            <button className="text-pink-purple">
                                Изменить
                            </button>
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
                <hr className="my-3" />
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-end-5">
                        <p className="text-gray-400">Пароль</p>
                    </div>
                    <div className="col-start-5 col-end-10">
                        <p>•••••••••••••••••••</p>
                    </div>
                    <div className="flex justify-end col-start-10 col-end-13">
                        <button className="text-pink-purple">Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
