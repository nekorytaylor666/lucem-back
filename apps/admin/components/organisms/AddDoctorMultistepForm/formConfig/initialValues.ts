import { AllowedExperienceAndEducationTypes } from "@graphqlTypes/globalTypes";
import exp from "constants";
import { format } from "date-fns";
import { GetDoctorByID_getDoctorByID } from "graphql/query/getDoctorById/__generated__/GetDoctorById";

export const registerDoctorInitialValues = {
    personalInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        birthDate: "",
        gender: "male",
    },
    contactInfo: {
        workPhone: "",
        email: "",
    },
    professionalInfo: {
        specializations: [],
        acceptableAgeGroup: "Both",
        yearsOfExperiance: "",
        specialistCut: "50",
        clinicCut: "50",
    },
    educationInfo: [
        {
            schoolName: "",
            specialty: "",
            endYear: "",
            startYear: "",
        },
    ],
    qualificationInfo: [
        {
            courseName: "",
            specialty: "",
            startYear: "",
            endYear: "",
        },
    ],
    jobExperienceInfo: [
        {
            companyName: "",
            specialty: "",
            startYear: "",
            endYear: "",
        },
    ],
    languagesInfo: [
        {
            language: "Русский",
        },
    ],
    photoInfo: {
        file: null,
    },
};

const editDoctorInitialValues = {
    personalInfo: {
        firstName: "",
        lastName: "",
        middleName: "",
        birthDate: "",
        gender: "male",
    },
    contactInfo: {
        workPhone: "",
        email: "",
    },
    professionalInfo: {
        specializations: [{ id: "" }],
        acceptableAgeGroup: "Both",
        yearsOfExperiance: "",
        specialistCut: "50",
        clinicCut: "50",
    },
    educationInfo: [
        {
            schoolName: "",
            specialty: "",
            endYear: "",
            startYear: "",
        },
    ],
    qualificationInfo: [
        {
            courseName: "",
            specialty: "",
            startYear: "",
            endYear: "",
        },
    ],
    jobExperienceInfo: [
        {
            companyName: "",
            specialty: "",
            startYear: "",
            endYear: "",
        },
    ],
    languagesInfo: [
        {
            language: "Русский",
        },
    ],
    photoInfo: {
        file: null,
    },
    password: "",
    workTimes: [],
};

export type RegisterDoctorFormSchema = typeof registerDoctorInitialValues;
export type EditDoctorFormSchema = typeof editDoctorInitialValues;

export const mapDoctorDataToEditDoctorFormValues = (
    doctor,
): EditDoctorFormSchema => {
    const workTimes = doctor.workTimes
        ? {
              startTime: format(
                  new Date(doctor.workTimes[0].startTime),
                  "HH:mm",
              ),
              endTime: format(new Date(doctor.workTimes[0].endTime), "HH:mm"),
          }
        : { startTime: "", endTime: "" };

    console.log("doctor", doctor);

    const educationInfo =
        doctor.experiences.find(
            (exp) => exp.name === AllowedExperienceAndEducationTypes.Education,
        )?.data ?? [];

    const qualificationInfo =
        doctor.experiences.find(
            (exp) => exp.name === AllowedExperienceAndEducationTypes.Courses,
        )?.data ?? [];

    const jobExperienceInfo =
        doctor.experiences.find(
            (exp) => exp.name === AllowedExperienceAndEducationTypes.Experience,
        )?.data ?? [];

    console.log(
        "experiences",
        educationInfo,
        qualificationInfo,
        jobExperienceInfo,
        doctor.experiences,
    );
    return {
        educationInfo,
        jobExperienceInfo,
        languagesInfo: doctor.languages,
        photoInfo: doctor.avatar,
        professionalInfo: {
            acceptableAgeGroup: doctor.acceptableAgeGroup as string,
            clinicCut: (100 - doctor.doctorPercentage).toString(),
            specialistCut: doctor.doctorPercentage ?? 50,
            specializations: [{ id: "" }],
            yearsOfExperiance: "5",
        },

        qualificationInfo,
        personalInfo: {
            firstName: doctor.fullName.split(" ")[0],
            lastName: doctor.fullName.split(" ")[1],
            middleName: doctor.fullName.split(" ")[2],
            birthDate: doctor.dateOfBirth ?? "",
            gender: doctor.isMan ? "male" : "female",
        },
        contactInfo: {
            email: doctor.email,
            workPhone: doctor.phoneNumber ?? "",
        },
        workTimes,
        password: "",
    };
};
