import { useQuery } from "@apollo/client";
import {
    Field,
    FieldArray,
    FieldArrayRenderProps,
    useFormikContext,
} from "formik";
import { GET_SPECIALIZATIONS } from "graphql/query/getSpecs";
import { GetSpecializations } from "graphql/query/getSpecs/__generated__/GetSpecializations";
import { FC } from "react";
import { RegisterDoctorFormSchema } from "./formConfig/initialValues";
import { FormStepProps } from "./types";

export const ProfessionalInfo: FC<FormStepProps> = ({
    editDoctor,
    onNext,
    onPrev,
}) => {
    return (
        <div className="space-y-3">
            <p>Профессиональная информация</p>
            <div className="space-y-2">
                {!editDoctor && (
                    <FieldArray
                        name="professionalInfo.specializations"
                        component={SpecializationsFieldArray as any}
                    />
                )}

                <div className="space-y-2">
                    <p>Принимает</p>
                    <label className="cursor-pointer flex items-center space-x-2">
                        <Field
                            type="radio"
                            name="professionalInfo.acceptableAgeGroup"
                            className="radio"
                            value="Adult"
                        />
                        <span className="label-text">Только взрослых</span>
                    </label>
                    <label className="cursor-pointer flex items-center space-x-2">
                        <Field
                            type="radio"
                            name="professionalInfo.acceptableAgeGroup"
                            className="radio"
                            value="Child"
                        />
                        <span className="label-text">Только детей</span>
                    </label>
                    <label className="cursor-pointer flex items-center space-x-2">
                        <Field
                            type="radio"
                            name="professionalInfo.acceptableAgeGroup"
                            className="radio"
                            value="Both"
                            checked
                        />
                        <span className="label-text">Взрослых и детей</span>
                    </label>
                </div>
                <div className="">
                    <p>Дата начала карьеры</p>
                    <div className="flex gap-8">
                        <div className="flex-1 bg-gray-100 p-3 flex rounded">
                            <Field
                                type="date"
                                name="professionalInfo.startingExperienceDate"
                                placeholder="___"
                                className="bg-gray-100 focus:outline-none "
                            />
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>
                <div className="">
                    <p>Процент от заработка</p>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-gray-100 p-3 flex rounded space-x-2">
                            <p className="text-gray-400">Врачу</p>
                            <p className="text-gray-400">-</p>
                            <div className="flex">
                                <Field
                                    name="professionalInfo.specialistCut"
                                    type="number"
                                    className="bg-gray-100 focus:outline-none w-12"
                                />
                                <p>%</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-100 p-3 flex rounded space-x-2">
                            <p className="text-gray-400">Клинике</p>
                            <p className="text-gray-400">-</p>
                            <div className="flex">
                                <Field
                                    name="professionalInfo.clinicCut"
                                    type="number"
                                    className="bg-gray-100 focus:outline-none w-12"
                                />
                                <p>%</p>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
};

const SpecializationsFieldArray = (props: FieldArrayRenderProps) => {
    const { push } = props;
    const { values } = useFormikContext<RegisterDoctorFormSchema>();
    const { data } = useQuery<GetSpecializations>(GET_SPECIALIZATIONS);
    const specializations = data?.getSpecializations ?? [];
    const onAdd = () => {
        push({ id: specializations[0]._id });
    };

    return (
        <>
            {values?.professionalInfo?.specializations?.map((spec, index) => (
                <div>
                    <p>Специализация {index + 1}</p>
                    <Field
                        as="select"
                        name={`professionalInfo.specializations[${index}].id`}
                        className="select w-full py-3 bg-gray-100"
                    >
                        {specializations.map((spec) => (
                            <option value={spec._id}>{spec.name}</option>
                        ))}
                    </Field>
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
                        Добавить специализацию
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
        </>
    );
};
