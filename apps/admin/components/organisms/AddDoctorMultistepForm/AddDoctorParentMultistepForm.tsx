import { useMutation } from "@apollo/client";
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
import { GET_DOCTORS } from "graphql/query/getDoctors";

const ParentMultistepForm = () => {
    const router = useRouter();

    const [mutateFunction, { data, loading, error }] = useMutation<
        RegisterDoctor,
        RegisterDoctorVariables
    >(
        REGISTER_DOCTOR_MUTATION,

        {
            refetchQueries: [GET_DOCTORS],
            onCompleted: (data) => {
                alert("Complete!");
            },
        },
    );

    const formatExperienceData = (values: RegisterDoctorFormSchema) => {
        console.log("before format:", values);
        const experience: ExperienceDataInput[] = values.jobExperienceInfo.map(
            (item) => {
                return {
                    institutionName: item.institutionName,
                    specialty: item.specialty,
                    years: item.years.map((el) => parseInt(el)),
                };
            },
        );

        const education: ExperienceDataInput[] = values.educationInfo.map(
            (item) => {
                return {
                    institutionName: item.institutionName,
                    specialty: item.specialty,
                    years: item.years.map((el) => parseInt(el)),
                };
            },
        );

        const qualifications: ExperienceDataInput[] =
            values.qualificationInfo.map((item) => {
                return {
                    institutionName: item.institutionName,
                    specialty: item.specialty,
                    years: item.years.map((el) => parseInt(el)),
                };
            });
        return {
            experience,
            education,
            qualifications,
        };
    };

    const onRegisterDoctorFormSubmit = (values: RegisterDoctorFormSchema) => {
        const { experience, education, qualifications } =
            formatExperienceData(values);
        console.log("after format:", values);
        mutateFunction({
            variables: {
                fullName:
                    values.personalInfo.lastName +
                    " " +
                    values.personalInfo.firstName +
                    " " +
                    values.personalInfo.middleName,
                isMan: values.personalInfo.gender === "male",
                email: values.contactInfo.email,
                acceptableAgeGroup: values.professionalInfo
                    .acceptableAgeGroup as AcceptableAgeGroup,
                dateOfBirth: values.personalInfo.birthDate,
                description: "",
                languages: [
                    {
                        language: AllowedDoctorLanguages.English,
                        type: AllowedDoctorLanguageTypes.First,
                    },
                ],
                doctorPercentage: Number(values.professionalInfo.specialistCut),
                password: "1234",
                phoneNumber: values.contactInfo.workPhone,
                startingExperienceDate:
                    values.professionalInfo.startingExperienceDate,
                avatar: values.photoInfo.file ?? null,
                experience: [
                    {
                        data: experience,
                        name: AllowedExperienceAndEducationTypes.Experience,
                    },
                    {
                        data: education,
                        name: AllowedExperienceAndEducationTypes.Education,
                    },
                    {
                        data: qualifications,
                        name: AllowedExperienceAndEducationTypes.Education,
                    },
                ],
                workTimes: createWorkTimesFromStartEndTimes("08:00", "17:00"),
                cabinet: "105",
                // specializationIds: values.professionalInfo.specializations.map(
                //     (item) => item.id,
                // ),
            },
            onCompleted: () => alert("Completed!"),
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
            slug: "personal-data",
            label: "1. Личные данные",
            component: <PersonalInfo onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "contact-info",
            label: "2. Контактная информация",
            component: <ContactInfo onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "professional-info",
            label: "3. Профессиональная информация",
            component: (
                <ProfessionalInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "education",
            label: "4. Образование",
            component: (
                <EducationInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "qualification",
            label: "5. Курсы повышения квалификации",
            component: (
                <Qualification onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "previous-jobs",
            label: "6. Клиники и медицинские центры",
            component: (
                <JobExperienceInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "languages",
            label: "7. Языки",
            component: (
                <LanguagesInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "photo",
            label: "8. Фото",
            component: (
                <PhotoUploadStep onNext={handleNext} onPrev={handleBack} />
            ),
        },
    ];

    const currentStep = steps[activeStep].component;

    return (
        <div className="flex mt-5 gap-4">
            {loading && <div>Loading...</div>}
            <div className="flex-1">
                <Formik
                    initialValues={registerDoctorInitialValues}
                    onSubmit={onRegisterDoctorFormSubmit}
                >
                    <Form>
                        <div className="rounded-2xl bg-white py-5 px-7">
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
