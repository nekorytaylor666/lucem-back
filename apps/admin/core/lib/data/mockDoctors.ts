import { specializations } from "@core/mock/specializations";
import { DoctorEntity } from "@core/types/doctors/IDoctors";
import faker from "faker";
import { SpecializationEntity } from "../../types/specializations/ISpecialization";
faker.locale = "ru";

const generateDoctor = (id: string) => {
    return {
        _id: id,
        fullName: faker.name.findName(),
        dateOfBirth: faker.date.past(),
        imageUrl: `/images/doctors/${id}.jpg`,
        jobDescription: faker.lorem.lines(1),
        specialization:
            specializations[faker.datatype.number({ min: 0, max: 6 })],
        yearsOfExperience: faker.datatype.number({ min: 10, max: 30 }),
    };
};

export const mockDoctors: DoctorEntity[] = [...Array(11)].map((_, i) =>
    generateDoctor(i.toString()),
);

export const getDoctorBySpecialization = (
    specialization: SpecializationEntity,
    data = mockDoctors,
) => {
    return data.filter((el) => el.specialization.slug === specialization.slug);
};
