import { useMutation } from "@apollo/client";

import { Form, Formik } from "formik";
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
} from "./formConfig/initialValues";
import { HobbyInfo } from "./HobbyStep";
import { LanguagesInfo } from "./LanguagesStep";
import { PersonalInfo } from "./PersonalInfoStep";
import PhotoUploadStep from "./PhotoUploadStep";
import { JobExperienceInfo } from "./PrevJobInfoStep";
import { ProfessionalInfo } from "./ProfessionalInfoStep";
import { Qualification } from "./QualificationStep";
import { setHours, setDay } from "date-fns";
import { createWorkTimesFromStartEndTimes } from "./utils/createWorkTimes";
import { REGISTER_USER } from "@src/api/mutations/registerUser";
import { getDoctorTokens } from "@src/utils/getToken";

const ParentMultistepForm = () => {
    const router = useRouter();

    // const [mutateFunction, { data, loading, error }] = useMutation<
    //     RegisterDoctor,
    //     RegisterDoctorVariables
    // >(REGISTER_DOCTOR_MUTATION, {
    //     onCompleted: (data) => {
    //         alert("Complete!");
    //     },
    // });

    const [registerUser, { loading }] = useMutation(REGISTER_USER);
    const { token } = getDoctorTokens();
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
            slug: "personal-data",
            label: "1. Личные данные",
            component: <PersonalInfo onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "personal-contact",
            label: "2. Контактная информация",
            component: <ContactInfo onNext={handleNext} onPrev={handleBack} />,
        },
    ];

    const currentStep = steps[activeStep].component;

    return (
        <div className="flex mt-5 gap-4  ">
            {/* {loading && <div>Loading...</div>} */}
            <div className="flex-1">
                <Formik
                    initialValues={{
                        personalInfo: {
                            firstName: "Иван",
                            lastName: "Иванов",
                            middleName: "Евгеньевич",
                            birthDate: "2000-12-23",
                            gender: "male",
                        },
                        contactInfo: {
                            phoneNumber: "77783973990",
                            email: "akmt.me23@gmail.com",
                        },
                    }}
                    onSubmit={async (values) => {
                        await registerUser({
                            variables: {
                                dateOfBirth: new Date(
                                    values.personalInfo.birthDate,
                                ),
                                email: values.contactInfo.email,
                                fullName:
                                    values.personalInfo.firstName +
                                    " " +
                                    values.personalInfo.lastName,
                                phoneNumber: values.contactInfo.phoneNumber,
                            },
                            context: {
                                headers: {
                                    Authorization: token,
                                },
                            },
                            onError: (err) => {
                                console.log(err.message);
                            },
                        });
                        alert("Пациент добавлен");

                        router.push("/patients");
                    }}
                >
                    <Form>
                        <div className="rounded-2xl py-5 pr-7">
                            {currentStep}
                        </div>
                    </Form>
                </Formik>
            </div>
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

export default ParentMultistepForm;
