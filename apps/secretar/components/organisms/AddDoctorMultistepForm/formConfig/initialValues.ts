import { AllowedExperienceAndEducationTypes } from "@graphqlTypes/globalTypes";
import exp from "constants";
import { format } from "date-fns";
import { GetDoctorByID_getDoctorByID } from "graphql/query/getDoctorById/__generated__/GetDoctorById";

export const registerDoctorInitialValues = {
    personalInfo: {
        firstName: "Тохтар",
        lastName: "Ахметов",
        middleName: "Маратович",
        birthDate: "23.11.2000",
        gender: "male",
    },
    contactInfo: {
        workPhone: "87783973990",
        email: "akmt.me23@gmail.com",
    },
    professionalInfo: {
        specializations: [{ id: "" }],
        acceptableAgeGroup: "both",
        yearsOfExperiance: "4",
        specialistCut: "50",
        clinicCut: "50",
    },
    educationInfo: [
        {
            schoolName: "Школа №1",
            specialty: "Терапевт",
            endYear: "23.11.2000",
            startYear: "23.11.2000",
        },
    ],
    qualificationInfo: [
        {
            courseName: "Школа №1",
            specialty: "Терапевт",
            startYear: "23.11.2000",
            endYear: "23.11.2000",
        },
    ],
    jobExperienceInfo: [
        {
            companyName: "Рофл",
            specialty: "Терапевт",
            startYear: "23.11.2000",
            endYear: "23.11.2000",
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
        firstName: "Тохтар",
        lastName: "Ахметов",
        middleName: "Маратович",
        birthDate: "23.11.2000",
        gender: "male",
    },
    contactInfo: {
        workPhone: "87783973990",
        email: "akmt.me23@gmail.com",
    },
    workTimes: {
        startTime: "",
        endTime: "",
    },
    password: "",
};

export type RegisterDoctorFormSchema = typeof registerDoctorInitialValues;
export type EditDoctorFormSchema = typeof editDoctorInitialValues;

//doctor does not have gender and birth date
export const mapDoctorDataToEditDoctorFormValues = (
    doctor: GetDoctorByID_getDoctorByID,
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

    return {
        personalInfo: {
            firstName: doctor.fullName.split(" ")[0],
            lastName: doctor.fullName.split(" ")[1],
            middleName: doctor.fullName.split(" ")[2],
            birthDate: "23.11.2000",
            gender: "male",
        },
        contactInfo: {
            email: doctor.email,
            workPhone: doctor.phoneNumber,
        },
        workTimes,
        password: "",
    };
};
