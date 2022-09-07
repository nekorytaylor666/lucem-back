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

export const LanguagesInfo: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>7. Языки</p>
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

const LanguagesFieldArray = (props: FieldArrayRenderProps) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();

    const onAdd = () => {
        push({ name: "" });
    };

    return (
        <>
            {values?.languagesInfo?.map((_, index) => (
                <div>
                    <p className="text-xl">Язык {index + 1}</p>
                    <div className="flex items-center space-x-2">
                        <Field
                            name={`languagesInfo${index}.language`}
                            type="text"
                            placeholder="Язык"
                            className="input bg-gray-100 w-full"
                        />
                    </div>
                </div>
            ))}
            <div className="flex items-center">
                <div className="h-px w-full bg-gray-100"></div>
                <div>
                    <button
                        onClick={onAdd}
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
