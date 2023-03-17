import { Switch } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import Link from "next/link";
import { FC } from "react";
import { FormStepProps } from "./types";

const weekDayLabels = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
];

export const WorkTimes: FC<FormStepProps> = ({ onNext, onPrev }) => {
    const { values, setFieldValue } = useFormikContext();
    console.log(values);
    return (
        <div className="space-y-3">
            <p className="font-bold text-3xl mb-8">Рабочие часы</p>

            {values.workTimes.map((item, index) => (
                <>
                    <div className="flex items-center gap-4">
                        <p className=" font-bold">{weekDayLabels[index]}</p>
                        <Switch
                            name={`workTimes[${index}].isActive`}
                            onChange={(e) => {
                                setFieldValue(
                                    `workTimes[${index}].isActive`,
                                    e.target.checked,
                                );
                            }}
                            isChecked={item.isActive}
                        ></Switch>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div>
                            <p>Начало</p>
                            <Field
                                disabled={!item.isActive}
                                name={`workTimes[${index}].startTime`}
                                type="text"
                                placeholder="8:30"
                                className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                            />
                        </div>
                        <div>
                            <p>Конец</p>
                            <Field
                                disabled={!item.isActive}
                                name={`workTimes[${index}].endTime`}
                                type="text"
                                placeholder="18:30"
                                className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                            />
                        </div>
                    </div>
                </>
            ))}

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-3 px-5 border border-pink-purple text-pink-purple rounded"
                >
                    Назад
                </button>
                <button
                    type="submit"
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Изменить
                </button>
            </div>
        </div>
    );
};
