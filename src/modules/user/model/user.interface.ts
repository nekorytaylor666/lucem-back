import { ObjectId } from 'mongodb';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';
import { Peculiarities } from './utils/peculiarities.interface';

export interface User {
    _id: ObjectId;
    fullName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    token?: string;
    photoURL?: PhotoURL;
    peculiarities?: Peculiarities;
}
