import { ObjectId } from 'mongodb';

export interface Admin {
    _id: ObjectId;
    fullName: string;
    phoneNumber: string;
    email: string;
    passwordHASH: string;
}
