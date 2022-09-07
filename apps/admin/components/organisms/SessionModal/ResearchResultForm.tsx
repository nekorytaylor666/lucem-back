import currentSessionFormState from "@recoil/atoms/currentSession";
import RichTextEditor from "components/atoms/RichTextEditor";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { eventService } from "src/utils/eventService";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { SessionFormComponentProps } from "./shared/formComponentType";

export const ResearchResultForm: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
    const { researchResult } = formField;
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
                    <div className="flex items-center">
                        <select className="select select-bordered flex-grow border-transparent font-light mr-2">
                            <option disabled selected>
                                Новый шаблон
                            </option>
                        </select>
                        <button className="btn btn-primary btn-outline px-6 mr-2 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Новый
                        </button>
                        <button className="btn btn-primary px-6 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Новый
                        </button>
                    </div>
                </div>
                <div className=" border-b-2 border-base-300 w-full mb-4"></div>
                <div className="form-control">
                    <Field
                        name={researchResult.description.name}
                        className="textarea h-24"
                        placeholder="Описание"
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
