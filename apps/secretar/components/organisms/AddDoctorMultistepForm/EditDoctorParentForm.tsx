import { useMutation, useQuery } from "@apollo/client";
import {
    AcceptableAgeGroup,
    AllowedDoctorLanguages,
    AllowedDoctorLanguageTypes,
    AllowedExperienceAndEducationTypes,
    ExperienceDataInput,
} from "@graphqlTypes/globalTypes";
import { Form, Formik } from "formik";
import { REGISTER_DOCTOR_MUTATION } from "graphql/mutation/registerDoctor";
import {
    RegisterDoctor,
    RegisterDoctorVariables,
} from "graphql/mutation/registerDoctor/__generated__/RegisterDoctor";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import TabsHeadForStaff from "src/plugins/tab-routing/components/TabsHeadForStaff";
import { useTabRouting } from "src/plugins/tab-routing/hooks/useTabRouting";
import { ContactInfo } from "./ContactInfoStep";
import { EducationInfo } from "./EducationalInfoStep";
import {
    registerDoctorInitialValues,
    RegisterDoctorFormSchema,
    mapDoctorDataToEditDoctorFormValues,
    EditDoctorFormSchema,
} from "./formConfig/initialValues";
import { HobbyInfo } from "./HobbyStep";
import { LanguagesInfo } from "./LanguagesStep";
import { PersonalInfo } from "./PersonalInfoStep";
import PhotoUploadStep from "./PhotoUploadStep";
import { JobExperienceInfo } from "./PrevJobInfoStep";
import { ProfessionalInfo } from "./ProfessionalInfoStep";
import { Qualification } from "./QualificationStep";
import { setHours, setDay } from "date-fns";
import { EDIT_DOCTOR_MUTATION } from "graphql/mutation/editDoctor";
import { EditDoctor, EditDoctorVariables } from "@graphqlTypes/EditDoctor";
import { GET_DOCTOR_BY_ID } from "graphql/query";
import { GetDoctorByID } from "graphql/query/getDoctorById/__generated__/GetDoctorById";
import { WorkTimes } from "./WorkTimes";
import { createWorkTimesFromStartEndTimes } from "./utils/createWorkTimes";
import { PasswordStep } from "./PasswordStep";

const EditDoctorParentMultistepForm = ({ doctorId }: { doctorId: string }) => {
    let token = "";
    if (typeof window !== "undefined") {
        token = localStorage.getItem("JWT") || "";
    }
    const [mutateFunction, { data, loading, error }] = useMutation<
        EditDoctor,
        EditDoctorVariables
    >(EDIT_DOCTOR_MUTATION, {
        onCompleted: (data) => {
            alert("Complete!");
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });

    const { data: doctorDataRes, loading: doctorDataLoading } =
        useQuery<GetDoctorByID>(GET_DOCTOR_BY_ID, {
            variables: { id: doctorId },
        });

    const doctorData = doctorDataRes?.getDoctorByID;

    const onEditDoctorFormSubmit = (values: EditDoctorFormSchema) => {
        mutateFunction({
            variables: {
                doctorId,
                fullName:
                    values.personalInfo.firstName +
                    " " +
                    values.personalInfo.lastName,
                email: values.contactInfo.email,
                phoneNumber: values.contactInfo.workPhone,
                workTimes: createWorkTimesFromStartEndTimes(
                    values.workTimes.startTime,
                    values.workTimes.endTime,
                ),
                password: values.password,
            },
        });
    };

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep + 1 >= steps.length) {
                return prevActiveStep;
            }
            return prevActiveStep + 1;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep - 1 < 0) {
                return prevActiveStep;
            }
            return prevActiveStep - 1;
        });
    };

    const steps: TabRoute[] = [
        {
            slug: "contact-info",
            label: "1. Контактная информация",
            component: <ContactInfo onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "work-times",
            label: "2. Рабочие часы",
            component: <WorkTimes onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "work-times",
            label: "3. Пароль",
            component: <PasswordStep onNext={handleNext} onPrev={handleBack} />,
        },
    ];

    const currentStep = steps[activeStep].component;

    return (
        <div className="flex mt-5 gap-4">
            {loading && <div>Loading...</div>}
            {doctorData && (
                <div className="flex-1">
                    <Formik
                        initialValues={mapDoctorDataToEditDoctorFormValues(
                            doctorData,
                        )}
                        onSubmit={onEditDoctorFormSubmit}
                    >
                        <Form>
                            <div className="rounded-2xl bg-white py-5 px-7">
                                {currentStep}
                            </div>
                        </Form>
                    </Formik>
                </div>
            )}
            <div className="flex-1">
                <TabsHeadForStaff
                    onStepClick={(stepIndex) => {
                        setActiveStep(stepIndex);
                    }}
                    activeStep={activeStep}
                    routes={steps}
                ></TabsHeadForStaff>
            </div>
        </div>
    );
};

export default EditDoctorParentMultistepForm;
