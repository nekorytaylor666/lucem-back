import { ObjectId } from "mongodb";


export interface Token {
    _id: ObjectId;
    email: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date;
}