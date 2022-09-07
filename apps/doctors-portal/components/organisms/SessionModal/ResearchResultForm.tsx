import currentSessionFormState from "@recoil/atoms/currentSession";
import RichTextEditor from "components/atoms/RichTextEditor";
import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { eventService } from "src/utils/eventService";
import { PatientFileUploadInput } from "../PatientFileSystem";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";

export const ResearchResultForm: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
    const { researchResult } = formField;
    const { setFieldValue, values } = useFormikContext();

    return (
        <FormAnimatedContainer>
            <h3 className="font-medium text-xl mb-4">Исследования</h3>

            <div className="w-full bg-base-200 rounded-lg p-4">
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">
                            Результаты исследования
                        </span>
                    </label>
                </div>
                <div className=" border-b-2 border-base-300 w-full"></div>
                <div className="my-4">
                    <span className="text-base-300 mb-2">
                        Файл исследования
                    </span>
                    {values?.photoURL?.xl?.__typename === "PhotoURL" ? (
                        <img src={values?.photoURL?.xl} alt="" />
                    ) : (
                        <PatientFileUploadInput
                            onChange={(file) => {
                                setFieldValue(
                                    "appointmentResults.photoURL",
                                    file,
                                );
                            }}
                        ></PatientFileUploadInput>
                    )}
                </div>
                <div className="form-control">
                    <span className="text-base-300 ">
                        Описание исследования
                    </span>
                    <Field
                        name={"appointmentResults.description"}
                        className="textarea h-24"
                        placeholder="Описание"
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
