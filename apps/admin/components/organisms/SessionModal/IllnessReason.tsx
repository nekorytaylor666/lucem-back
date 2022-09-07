import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { Formik, Field, Form } from "formik";
import { SessionFormComponentProps } from "./shared/formComponentType";
import currentSessionFormState from "@recoil/atoms/currentSession";
import { useRecoilState } from "recoil";
import { eventService } from "src/utils/eventService";
import RichTextEditor from "components/atoms/RichTextEditor";

export const IllnessReason: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
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

    const { illnessReason } = formField;

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
                        name={illnessReason.issues.name}
                        component={RichTextEditor}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Болеет в течение</span>
                    </label>
                    <div className="flex">
                        <Field
                            placeholder="Кол-во"
                            className="input mr-2"
                            name={illnessReason.illnesTimeLength.amount.name}
                            type="number"
                        />
                        <Field
                            as="select"
                            name={illnessReason.illnesTimeLength.period.name}
                            className="select select-bordered w-full max-w-xs border-transparent font-light"
                        >
                            {periodOptions.map((period) => (
                                <option>{period.label}</option>
                            ))}
                        </Field>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Анамнез заболевания</span>
                    </label>
                    <Field
                        className="textarea h-24"
                        placeholder="Анамнез заболевания"
                        name={illnessReason.reason.name}
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
