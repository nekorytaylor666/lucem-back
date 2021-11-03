import { ObjectId } from 'mongodb';

export interface Desease {
    _id: ObjectId;
    name: string;
    doctorIds?: ObjectId[];
}
