import { ObjectId } from 'mongodb';
import { PhotoURL } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.interface';

export interface Specialization {
    _id?: ObjectId;
    name: string;
    description: string;
    photoURL?: PhotoURL;
    doctorIds?: ObjectId[];
}
