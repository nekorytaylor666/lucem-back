import { ObjectId } from "mongodb";


export interface Doctor {
    _id?: ObjectId;
    fullName: string;
    email: string;
    phoneNumber: string;
    token?: string;
    passwordHASH: string;
    dateOfBirth: Date;
    serviceIds?: string[];
    yearsOfExperience: number;
};