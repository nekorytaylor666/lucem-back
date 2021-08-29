import { ObjectId } from "mongodb";

export enum TokenRoles {
    User = "user",
    Doctor = "doctor",
    Secretary = "secretary",
    Nurse = "nurse",
    Admin = "admin",
}

export interface Token {
    _id: ObjectId;
    email: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    role: TokenRoles;
}