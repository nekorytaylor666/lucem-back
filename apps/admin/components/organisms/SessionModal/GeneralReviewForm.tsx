import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import {
    Formik,
    Form,
    FieldArray,
    Field,
    FormikValues,
    useFormik,
    useFormikContext,
} from "formik";
import {
    SessionFormComponentProps,
    SessionFormValuesObject,
} from "./shared/formComponentType";
import { eventService } from "src/utils/eventService";
import { useRecoilState } from "recoil";
import currentSessionFormState from "@recoil/atoms/currentSession";
import { ConsultSessionEntity } from "@core/types/session/ISession";
import RichTextEditor from "components/atoms/RichTextEditor";

export const GeneralReviewForm: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
    const { values } = useFormikContext<ConsultSessionEntity>();
    return (
        <FormAnimatedContainer>
            <h3 className="font-medium text-xl mb-4">Осмотр</h3>

            <FieldArray
                name="generalReview.reviews"
                render={(arrayHelpers) => (
                    <>
                        {values.generalReview.reviews?.map((review, index) => (
                            <div className="w-full bg-base-200 rounded-lg p-4 mb-4">
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">
                                            Шаблон пункта осмотра
                                        </span>
                                    </label>
                                    <div className="flex items-center">
                                        <select className="select select-bordered flex-grow border-transparent font-light mr-2">
                                            <option disabled selected>
                                                Новый шаблон
                                            </option>
                                        </select>
                                        <button className="btn btn-primary px-6 flex items-center">
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
                                    </div>
                                </div>
                                <div className=" border-b-2 border-base-300 w-full mb-4"></div>
                                <div className="form-control">
                                    <Field
                                        name={`generalReview.reviews[${index}].description`}
                                        className="textarea h-24"
                                        placeholder="Описание"
                                        component={RichTextEditor}
                                    ></Field>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                arrayHelpers.push({
                                    description: "",
                                })
                            }
                            className="btn btn-primary btn-outline w-full"
                        >
                            + Добавить пункт осмотра
                        </button>
                    </>
                )}
            ></FieldArray>
        </FormAnimatedContainer>
    );
};
