import {
    Field,
    Form,
    Formik,
    FormikContext,
    useFormik,
    useFormikContext,
} from "formik";
import React, { useEffect, useRef } from "react";
import { FormAnimatedContainer } from "./FormAnimatedContainer";
import { eventService } from "../../../src/utils/eventService";
import { SessionFormComponentProps } from "./shared/formComponentType";
import currentSessionFormState from "@recoil/atoms/currentSession";
import { useRecoilState } from "recoil";
import RichTextEditor from "components/atoms/RichTextEditor";
import { useLazyQuery } from "@apollo/client";
import { MKB_SEARCH } from "@src/api/queries/mkb-search";
import {
    MKBSearch,
    MKBSearchVariables,
    MKBSearch_searchICD,
} from "@graphqlTypes/MKBSearch";
import { getDoctorTokens } from "@src/utils/getToken";
import { fieldNameFromStoreName } from "apollo-upload-client/node_modules/@apollo/client/cache";

export const DiagnosesForm: React.FC<SessionFormComponentProps> = ({
    formField,
}) => {
    const { token } = getDoctorTokens();
    const { diagnoses } = formField;
    const { values, handleChange, setFieldValue } = useFormikContext();
    const [getSearch, { loading, error, data }] = useLazyQuery<
        MKBSearch,
        MKBSearchVariables
    >(MKB_SEARCH);

    useEffect(() => {
        getSearch({
            variables: {
                search: values?.["diagnose"]?.["deseaseDBCode"],
            },
            context: {
                headers: {
                    Authorization: token,
                },
            },
        });
    }, [values?.["diagnose"]?.["deseaseDBCode"]]);
    const mkbSearchResult = data?.searchICD;
    const onSearhResultClick = (mkbSearchResult: MKBSearch_searchICD) => {
        setFieldValue(
            "diagnose.deseaseDBCode",
            `${mkbSearchResult.code}: ${mkbSearchResult.description}`,
        );
    };

    return (
        <FormAnimatedContainer>
            <div className="w-full bg-base-200 rounded-lg p-4">
                <div>
                    <span className=" text-xs text-base-300">
                        Изменено: {values?.diagnose?.doctor?.fullName}
                    </span>
                </div>
                <h3 className="font-medium text-xl mb-4">Диагноз</h3>

                <div className="btn-group mb-2">
                    <div role="group" aria-labelledby="my-radio-group">
                        <label className="btn btn-lg btn-outline btn-primary mr-2">
                            <Field
                                type="radio"
                                name="diagnose.preliminary"
                                value={"false"}
                                className="radio radio-primary mr-2"
                            />
                            Окончательный
                        </label>
                        <label className="btn btn-lg btn-outline btn-primary">
                            <Field
                                type="radio"
                                name="diagnose.preliminary"
                                value={"true"}
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
                    <input
                        onChange={handleChange}
                        value={values?.["diagnose"]?.["deseaseDBCode"]}
                        name={"diagnose.deseaseDBCode"}
                        className="input input-bordered flex-grow border-transparent font-light mr-2"
                    ></input>
                    <ul className="menu bg-base-100 w-full h-56 overflow-y-scroll mt-4">
                        {mkbSearchResult?.map((el) => (
                            <li
                                onClick={() => onSearhResultClick(el)}
                                className={`${
                                    `${el.code}: ${el.description}` ===
                                        values?.["diagnose"]?.[
                                            "deseaseDBCode"
                                        ] && "active"
                                } `}
                            >
                                <a>
                                    {el.code}: {el.description}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">
                            Развернутый клинический диагноз
                        </span>
                    </label>
                    <Field
                        name="diagnose.diagnose"
                        className="textarea h-24"
                        component={RichTextEditor}
                    ></Field>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Характер болезни</span>
                    </label>
                    <Field
                        name="diagnose.natureOfTheDesease"
                        className="textarea h-24"
                        component={RichTextEditor}
                    ></Field>
                </div>
            </div>
        </FormAnimatedContainer>
    );
};
