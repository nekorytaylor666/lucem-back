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
        acceptableAgeGroup: "both",
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
    // if less than 5 items in array, add empty items to array
    const addEmptyItems = (array, length) => {
        if (array.length < length) {
            const emptyItems = Array.from(
                { length: length - array.length },
                () => ({ startTime: "", endTime: "", isActive: false }),
            );
            return [...array, ...emptyItems];
        }
        return array;
    };
    const workTimes = doctor.workTimes
        ? addEmptyItems(
              doctor.workTimes.map((workTime) => ({
                  startTime: format(new Date(workTime.startTime), "HH:mm"),
                  endTime: format(new Date(workTime.endTime), "HH:mm"),
                  isActive: workTime.isActive,
              })),
              7,
          )
        : addEmptyItems([], 7);

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
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log(doctor.startingExperienceDate);
    return {
        educationInfo,
        jobExperienceInfo,
        languagesInfo: doctor.languages,
        photoInfo: doctor.avatar,
        defaultServiceId: doctor.defaultServiceId,
        professionalInfo: {
            acceptableAgeGroup: doctor.acceptableAgeGroup,
            clinicCut: (100 - doctor.doctorPercentage).toString(),
            specialistCut: doctor.doctorPercentage ?? 50,
            specializations: [],
            yearsOfExperiance: "5",
            startingExperienceDate:
                format(new Date(doctor.startingExperienceDate), "yyyy-MM-dd") ??
                "",
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
