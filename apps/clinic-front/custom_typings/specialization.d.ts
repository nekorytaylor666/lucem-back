import { Doctor } from "./doctor";
import { PhotoURL } from "./photoUrl";

export interface Specialization {
    _id: string;
    description: string;
    doctors: Doctor[];
    name: string;
    photoURL: PhotoURL;
    colorCodeGradient: {
        start: string;
        finish: string;
    };
}
