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

export const Qualification: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>5. Курсы повышения квалификации</p>
            <p className="text-gray-400">
                Заполнить информацию о курсах врач может сам в своем личном
                кабинете.
            </p>
            <FieldArray
                name="qualificationInfo"
                component={QualificationsFieldArray as any}
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

const QualificationsFieldArray: FC<FieldArrayRenderProps> = (props) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();

    const onAdd = () => {
        push({ courseName: "", speciality: "", startYear: "", endYear: "" });
    };
    return (
        <>
            {values?.qualificationInfo?.map((_, index) => (
                <div className="space-y-2 ">
                    <p className="text-xl">Курс повышения квалификации</p>
                    <div>
                        <p>Название</p>
                        <Field
                            type="text"
                            placeholder="Название"
                            name={`qualificationInfo[${index}].courseName`}
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Специальность</p>
                        <Field
                            type="text"
                            name={`qualificationInfo[${index}].specialty`}
                            placeholder="Специальность"
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                    <div>
                        <p>Года обучения</p>
                        <div className="flex items-center space-x-2">
                            <Field
                                type="text"
                                name={`qualificationInfo[${index}].startYear`}
                                placeholder="C"
                                className="input bg-gray-100"
                            />
                            <p>-</p>
                            <Field
                                type="text"
                                placeholder="По"
                                name={`qualificationInfo[${index}].endYear`}
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
                        Добавить курс
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
        </>
    );
};
