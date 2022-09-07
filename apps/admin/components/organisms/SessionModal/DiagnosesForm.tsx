import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { eventService } from "../../../src/utils/eventService";
import { SessionFormComponentProps } from "./shared/formComponentType";
import currentSessionFormState from "@recoil/atoms/currentSession";
import { useRecoilState } from "recoil";
import RichTextEditor from "components/atoms/RichTextEditor";

export const DiagnosesForm: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
    const { diagnoses } = formField;
    return (
        <FormAnimatedContainer>
            <div className="w-full bg-base-200 rounded-lg p-4">
                <h3 className="font-medium text-xl mb-4">Диагноз</h3>
                <div className="btn-group mb-2">
                    <div role="group" aria-labelledby="my-radio-group">
                        <label className="btn btn-lg btn-outline btn-primary mr-2">
                            <Field
                                type="radio"
                                name={diagnoses.diagnoseType.name}
                                value="final"
                                className="radio radio-primary mr-2"
                            />
                            Окончательный
                        </label>
                        <label className="btn btn-lg btn-outline btn-primary">
                            <Field
                                type="radio"
                                name={diagnoses.diagnoseType.name}
                                value="preview"
                                className="radio radio-primary mr-2"
                            />
                            Предварительный
                        </label>
                    </div>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Код по МКБ</span>
                    </label>
                    <Field
                        as="select"
                        name={diagnoses.mkb.name}
                        className="select select-bordered flex-grow border-transparent font-light mr-2"
                    >
                        <option disabled selected value="none">
                            Код по МКБ
                        </option>
                        <option value="I10">
                            I10 — Гипертоническая болезнь первой степени, первой
                            стадии, риск средней
                        </option>
                    </Field>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">
                            Развернутый клинический диагноз
                        </span>
                    </label>
                    <Field
                        name={diagnoses.fullIllnessDescription.name}
                        className="textarea h-24"
                        component={RichTextEditor}
                    ></Field>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Характер болезни</span>
                    </label>
                    <Field
                        name={diagnoses.illnessCharacteristics.name}
                        className="textarea h-24"
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
