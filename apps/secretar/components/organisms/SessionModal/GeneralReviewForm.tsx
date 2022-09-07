import React from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { FieldArray, Field, useFormikContext } from "formik";
import { SessionFormComponentProps } from "./shared/formComponentType";
import RichTextEditor from "components/atoms/RichTextEditor";
import { PatientFileUploadInput } from "../PatientFileSystem";

export const GeneralReviewForm: React.FC<SessionFormComponentProps> = () => {
    const { values, setFieldValue } = useFormikContext();

    return (
        <FormAnimatedContainer>
            <h3 className="font-medium text-xl mb-4">Осмотр</h3>

            <FieldArray
                name="inspections.data"
                render={(arrayHelpers) => (
                    <>
                        {values?.inspections?.data?.map((review, index) => (
                            <div className="w-full bg-base-200 rounded-lg p-4 mb-4">
                                <div className="form-control">
                                    <Field
                                        name={`inspections.data[${index}].description`}
                                        className="textarea h-24"
                                        placeholder="Описание"
                                        component={RichTextEditor}
                                    ></Field>
                                </div>
                                <div className="mt-4 border-b-2 border-base-300 w-full"></div>
                                <div className="my-4">
                                    <span className="text-base-300 mb-2">
                                        Файл осмотра
                                    </span>
                                    <PatientFileUploadInput
                                        onChange={(file) => {
                                            setFieldValue(
                                                `inspections.data[${index}].images`,
                                                file,
                                            );
                                        }}
                                    ></PatientFileUploadInput>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                arrayHelpers.push({
                                    description: "",
                                    images: undefined,
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
