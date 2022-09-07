import { Field } from "formik";
import Link from "next/link";
import { FC } from "react";
import { FormStepProps } from "./types";

export const PersonalInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>1. Личные данные</p>
            <div className="space-y-2">
                <div>
                    <p>Имя</p>
                    <Field
                        name="personalInfo.firstName"
                        type="text"
                        placeholder="Иван"
                        className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                    />
                </div>
                <div>
                    <p>Фамилия</p>
                    <Field
                        name="personalInfo.lastName"
                        type="text"
                        placeholder="Иванов"
                        className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                    />
                </div>
                <div>
                    <p>Отчество</p>
                    <Field
                        name="personalInfo.middleName"
                        type="text"
                        placeholder="Иванович"
                        className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                    />
                </div>
                <div>
                    <p>Дата рождения</p>
                    <Field
                        name="personalInfo.birthDate"
                        type="date"
                        placeholder="Иван"
                        className="bg-base-200 w-full input input-ghost"
                    />
                </div>
                <div className="space-y-2">
                    <p>Пол</p>
                    <label className="cursor-pointer flex items-center space-x-2">
                        <Field
                            name="personalInfo.gender"
                            type="radio"
                            className="radio"
                            value="male"
                        />
                        <span className="label-text">Мужской</span>
                    </label>
                    <label className="cursor-pointer flex items-center space-x-2">
                        <Field
                            name="personalInfo.gender"
                            type="radio"
                            className="radio"
                            value="female"
                        />
                        <span className="label-text">Женский</span>
                    </label>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
};
