import React from "react";

const PatientPage = () => {
    return (
        <div className="p-5 bg-white rounded-2xl">
            <div>
                <p className="text-4xl font-bold">Иванов Иван Евгеньевич</p>
            </div>
            <hr className="my-5" />
            <div className="flex gap-3">
                <div className="flex flex-1 gap-3">
                    <img
                        className="w-40 h-40 rounded-full"
                        src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
                        alt="avatar"
                    />
                    <div className="p-3 bg-gray-100 rounded space-y-3 w-full">
                        <div className="flex justify-between">
                            <p className="text-xl font-medium">Основное</p>
                            <button className="text-pink-purple">
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
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Пол:</p>
                            <p>Мужчина</p>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Дата рождения:</p>
                            <p>15.06.1999</p>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Возраст:</p>
                            <p>22 года</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 gap-3">
                    <div className="flex-1 p-3 bg-gray-100 rounded space-y-3 w-full">
                        <div className="flex justify-between">
                            <p className="text-xl font-medium">Контакты</p>
                            <button className="text-pink-purple">
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
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Тел:</p>
                            <p className="text-pink-purple">+7 708 382 24 61</p>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Почта:</p>
                            <p className="text-pink-purple">jean@tonic.com</p>
                        </div>
                    </div>
                    <div className="flex-1 p-3 bg-gray-100 rounded space-y-3 w-full">
                        <div className="flex justify-between">
                            <p className="text-xl font-medium">Особенности</p>
                            <button className="text-pink-purple">
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
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <p className="text-gray-400">Аллергии:</p>
                            <p>Нет</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPage;
