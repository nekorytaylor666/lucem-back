import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { Formik, Field, Form, useFormik } from "formik";
import { SessionFormComponentProps } from "./shared/formComponentType";
import currentSessionFormState from "@recoil/atoms/currentSession";
import { useRecoilState } from "recoil";
import { eventService } from "src/utils/eventService";
import RichTextEditor from "components/atoms/RichTextEditor";

export const IllnessReason: React.FC<SessionFormComponentProps> = () => {
    const periodOptions = [
        {
            default: true,
            label: "Дней",
        },
        {
            default: false,
            label: "Месяцев",
        },
        {
            default: false,
            label: "Лет",
        },
    ];

    const { values, handleChange, setFieldValue } = useFormik({
        initialValues: {
            amount: "",
            period: "",
        },
        onSubmit() {},
    });

    useEffect(() => {
        setFieldValue(
            "complaint.sicknessTimeDuration",
            `${values.amount} ${values.period}`,
        );
    }, [values.amount, values.period]);

    return (
        <FormAnimatedContainer>
            <h3 className="font-medium text-xl mb-4">
                Жалобы и анамнез заболевания
            </h3>
            <div className="w-full bg-base-200 rounded-lg p-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Жалобы</span>
                    </label>
                    <Field
                        name={"complaint.complaint"}
                        component={RichTextEditor}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Болеет в течение</span>
                    </label>
                    <div className="flex">
                        <input
                            onChange={handleChange}
                            value={values.amount}
                            placeholder="Кол-во"
                            className="input mr-2"
                            name={"amount"}
                            type="number"
                        />
                        <select
                            onChange={handleChange}
                            value={values.period}
                            name={"period"}
                            className="select select-bordered w-full max-w-xs border-transparent font-light"
                        >
                            {periodOptions.map((period) => (
                                <option>{period.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Анамнез заболевания</span>
                    </label>
                    <Field
                        className="textarea h-24"
                        placeholder="Анамнез заболевания"
                        name={"complaint.reason"}
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
