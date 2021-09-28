import { ObjectId } from "mongodb";
import { PhotoURL } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.interface";


export interface TestResults {
    _id?: ObjectId;
    userId: ObjectId;
    bookingId: ObjectId;
    date: Date;
    title: string;
    description: string;
    photoURL: PhotoURL[];
}