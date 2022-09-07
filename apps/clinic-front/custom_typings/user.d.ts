import { PhotoURL } from "./photoUrl";

export interface User {
    _id: string;
    dateOfBirth: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    photoUrl: PhotoURL;
    token: string;
}
