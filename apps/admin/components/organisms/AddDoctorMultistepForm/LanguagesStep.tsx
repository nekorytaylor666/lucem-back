import {
    Field,
    FieldArray,
    FieldArrayRenderProps,
    useFormikContext,
} from "formik";
import Link from "next/link";
import React, {FC, useState} from "react";
import { RegisterDoctorFormSchema } from "./formConfig/initialValues";
import { FormStepProps } from "./types";
import {AllowedDoctorLanguages, AllowedDoctorLanguageTypes} from "@graphqlTypes/globalTypes";

export const LanguagesInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>Языки</p>
            <p className="text-gray-400">
                Заполнить информацию о языках врач может сам в своем личном
                кабинете.
            </p>
            <div className="space-y-2">
                <FieldArray
                    name="languagesInfo"
                    component={LanguagesFieldArray as any}
                ></FieldArray>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-3 px-5 border border-pink-purple text-pink-purple rounded"
                >
                    Назад
                </button>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="py-3 px-5 bg-pink-purple text-white rounded"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </div>
    );
};

const LanguagesFieldArray = (props: FieldArrayRenderProps) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();

    const [selectedLanguage, setSelectedLanguage] = useState(
        AllowedDoctorLanguages.Russian,
    );

    const onAdd = (e: Event) => {
        e.preventDefault();
        push({
            language: selectedLanguage,
            type: AllowedDoctorLanguageTypes.Basic,
        });
        setSelectedLanguage(AllowedDoctorLanguages.Russian);
    };

    return (
        <>
            {values?.languagesInfo?.map((_, index) => (
                <div>
                    <p className="text-xl">Язык {index + 1}</p>
                    <div className="flex items-center space-x-2">
                        <Field
                            name={`language`}
                            type="text"
                            placeholder={"Язык"}
                            value={_.language}
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                </div>
            ))}
            <div className="flex items-center" style={{ gap: 5, marginTop: 25, marginBottom: 25 }}>
                <div className="h-px w-full bg-gray-100"></div>
                <div className={"flex"} style={{ gap: 5 }}>
                    <select
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value as AllowedDoctorLanguages)}
                        style={{
                            border: "1px solid #b1b1b1",
                            borderRadius: 8,
                            padding: 8,
                            fontSize: 14,
                        }}
                    >
                        <option value={AllowedDoctorLanguages.Russian}>Русский</option>
                        <option value={AllowedDoctorLanguages.German}>Немецкий</option>
                        <option value={AllowedDoctorLanguages.English}>Английский</option>
                        <option value={AllowedDoctorLanguages.Kazakh}>Казахский</option>
                        <option value={AllowedDoctorLanguages.Turkish}>Турецкий</option>
                    </select>
                    <button
                        onClick={(e) => {
                            onAdd(e);
                        }}
                        className="text-xs text-pink-purple"
                    >
                        Добавить язык
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
        </>
    );
};
