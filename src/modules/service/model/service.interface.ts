import { ObjectId } from 'mongodb';

export interface Service {
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
    doctorIds?: ObjectId[];
    isShown?: false;
    showServices?: ObjectId[];
    specializationId: ObjectId;
    durationInMinutes?: number;
}
