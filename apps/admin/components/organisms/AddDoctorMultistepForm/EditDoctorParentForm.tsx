import { useMutation, useQuery } from "@apollo/client";
import {
    AcceptableAgeGroup,
    AllowedDoctorLanguages,
    AllowedDoctorLanguageTypes,
    AllowedExperienceAndEducationTypes,
    ExperienceDataInput,
    ExperienceInput,
    LanguageInput,
    WorkTimeInput,
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
import { SpecializationsStep } from "./SpecializationsStep";

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function createExperienceData(experiences) {
        console.log("experience item", experiences[1]);
        return experiences.map((item) => {
            return {
                data: item.data.map((a) => ({
                    institutionName: a.institutionName,
                    specialty: a.specialty,
                    years: [+a.years[0], +a.years[1]],
                })),
                name: item.name,
            };
        });
    }

    function createLanguageData(languages) {
        return languages.map((item) => ({
            language: item.language,
            type: item.type,
        }));
    }

    const onEditDoctorFormSubmit = (values: EditDoctorFormSchema) => {
        mutateFunction({
            variables: {
                doctorId,
                fullName:
                    values.personalInfo.firstName +
                    " " +
                    values.personalInfo.lastName +
                    " " +
                    values.personalInfo.middleName,
                email: values.contactInfo.email,
                description: " ",
                acceptableAgeGroup: capitalizeFirstLetter(
                    values.professionalInfo.acceptableAgeGroup,
                ) as AcceptableAgeGroup,
                dateOfBirth: values.personalInfo.birthDate,
                // avatar: values.photoInfo,
                experiences: createExperienceData([
                    {
                        name: AllowedExperienceAndEducationTypes.Education,
                        data: values.educationInfo,
                    },
                    {
                        name: AllowedExperienceAndEducationTypes.Courses,
                        data: values.qualificationInfo,
                    },
                    {
                        name: AllowedExperienceAndEducationTypes.Experience,
                        data: values.jobExperienceInfo,
                    },
                ]),
                languages: createLanguageData(values.languagesInfo),
                isMan: values.personalInfo.gender === "male",
                doctorPercentage: Number(values.professionalInfo.specialistCut),
                password: values.password,
                phoneNumber: values.contactInfo.workPhone,
                startingExperienceDate:
                    values.professionalInfo.startingExperienceDate,
                workTimes: createWorkTimesFromStartEndTimes(
                    values.workTimes.startTime,
                    values.workTimes.endTime,
                ),
            },
            context: {
                headers: {
                    Authorization: token,
                },
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
                <ProfessionalInfo
                    doctorData={doctorData}
                    editDoctor={true}
                    onNext={handleNext}
                    onPrev={handleBack}
                />
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
            label: "6. Предыдущие места работы",
            component: (
                <JobExperienceInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        {
            slug: "work-times",
            label: "7. Рабочие часы",
            component: <WorkTimes onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "work-times",
            label: "8. Пароль",
            component: <PasswordStep onNext={handleNext} onPrev={handleBack} />,
        },
        {
            slug: "specializations",
            label: "9. Специализации",
            component: (
                <SpecializationsStep
                    doctorData={doctorData}
                    onNext={handleNext}
                    onPrev={handleBack}
                />
            ),
        },
        {
            slug: "languages",
            label: "10. Языки",
            component: (
                <LanguagesInfo onNext={handleNext} onPrev={handleBack} />
            ),
        },
        // {
        //     slug: "photo",
        //     label: "11. Фото",
        //     component: (
        //         <PhotoUploadStep onNext={handleNext} onPrev={handleBack} />
        //     ),
        // },
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
