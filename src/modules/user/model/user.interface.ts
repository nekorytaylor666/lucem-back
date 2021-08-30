import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    passwordHASH: string;
    token?: string;
}