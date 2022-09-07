import { PhotoURL } from "./photoUrl";
import { Timeline } from "./timeline";
type AcceptableAgeGroup = "adult" | "child" | "both";

export interface Doctor {
    _id: string;
    acceptableAgeGroup: AcceptableAgeGroup;
    avatar: PhotoURL;
    dateOfBirth: string;
    description: string;
    specializations: {
        name;
    }[];

    deseases: Desease[];
    email: string;
    fullName: string;
    numOfRatings: number;
    phoneNumber: string;
    rating: number;
    timelines: Timeline[];
    yearsOfExperience: number;
}
