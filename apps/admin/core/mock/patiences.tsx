import { PatientEntity } from "@core/types/patient/IPatient";
import faker from "faker";
faker.locale = "ru";
export const patientArray = [...Array(40)].map((_, i): PatientEntity => {
    return {
        fullName: faker.name.findName(),
        avatarUrl: faker.image.avatar(),
        id: faker.datatype.number().toString(),
    };
});

export const getPatientById = (id: string): PatientEntity | undefined => {
    return patientArray.find((patient) => patient.id === id);
};

export const getRandomPatient = (): PatientEntity => {
    return {
        fullName: faker.name.findName(),
        avatarUrl: faker.image.avatar(),
        id: faker.datatype.number().toString(),
    };
};
