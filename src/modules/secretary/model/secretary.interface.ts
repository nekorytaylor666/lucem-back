import { ObjectId } from 'mongodb';

export interface Secretary {
    _id: ObjectId;
    fullName: string;
    passwordHASH: string;
    email: string;
    phoneNumber: string;
}
