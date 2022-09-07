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

export const EducationInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>4. Образование</p>
            <p className="text-gray-400">
                Заполнить информацию об образовании врач может сам в своем
                личном кабинете.
            </p>
            <FieldArray
                name="educationInfo"
                component={EducationFieldArray as any}
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

const EducationFieldArray: FC<FieldArrayRenderProps> = (props) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();

    const onAdd = () => {
        push({ schoolName: "", speciality: "", startYear: "", endYear: "" });
    };
    return (
        <>
            {values?.educationInfo?.map((_, index) => (
                <div className="space-y-2 ">
                    <p className="text-xl">Учебное заведение</p>
                    <div>
                        <p>Название</p>
                        <Field
                            type="text"
                            placeholder="Название"
                            name={`educationInfo[${index}].schoolName`}
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Специальность</p>
                        <Field
                            type="text"
                            name={`educationInfo[${index}].specialty`}
                            placeholder="Специальность"
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Года обучения</p>
                        <div className="flex items-center space-x-2">
                            <Field
                                type="text"
                                name={`educationInfo[${index}].startYear`}
                                placeholder="C"
                                className="input bg-gray-100"
                            />
                            <p>-</p>
                            <Field
                                type="text"
                                placeholder="По"
                                name={`educationInfo[${index}].endYear`}
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
                        Добавить учебное заведение
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
        </>
    );
};
