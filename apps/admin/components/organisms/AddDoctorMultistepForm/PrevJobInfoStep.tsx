import {
    Field,
    FieldArray,
    FieldArrayRenderProps,
    useFormikContext,
} from "formik";
import Link from "next/link";
import { FC } from "react";
import { RegisterDoctorFormSchema } from "./formConfig/initialValues";
import { FormStepProps } from "./types";

export const JobExperienceInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>Предыдущие места работы</p>
            <p className="text-gray-400">
                Заполнить информацию о предыдущих местах работы врач может сам в
                своем личном кабинете.
            </p>
            <FieldArray
                name="jobExperienceInfo"
                component={JobExperiencesFieldArray as any}
            ></FieldArray>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-3 px-5 border border-pink-purple text-pink-purple rounded"
                >
                    Назад
                </button>
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

const JobExperiencesFieldArray: FC<FieldArrayRenderProps> = (props) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();

    const onAdd = () => {
        push({
            institutionName: "",
            specialty: "",
            "years[0]": "",
            "years[1]": "",
        });
    };
    return (
        <>
            {values?.jobExperienceInfo?.map((_, index) => (
                <div className="space-y-2 ">
                    <p className="text-xl">Место работы</p>
                    <div>
                        <p>Название</p>
                        <Field
                            type="text"
                            placeholder="Название"
                            name={`jobExperienceInfo[${index}].institutionName`}
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Специальность</p>
                        <Field
                            type="text"
                            name={`jobExperienceInfo[${index}].specialty`}
                            placeholder="Специальность"
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Года обучения</p>
                        <div className="flex items-center space-x-2">
                            <Field
                                type="text"
                                name={`jobExperienceInfo[${index}].years[0]`}
                                placeholder="C"
                                className="input bg-gray-100"
                            />
                            <p>-</p>
                            <Field
                                type="text"
                                placeholder="По"
                                name={`jobExperienceInfo[${index}].years[1]`}
                                className="input bg-gray-100"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center">
                <div className="h-px w-full bg-gray-100"></div>
                <div>
                    <button
                        type="button"
                        onClick={onAdd}
                        className="text-xs text-pink-purple"
                    >
                        Добавить места работы
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
        </>
    );
};
