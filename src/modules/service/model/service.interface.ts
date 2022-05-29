import { ObjectId } from 'mongodb';

export interface Service {
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
    doctorIds?: ObjectId[];
    isShown?: false;
    showServices?: ObjectId[];
    specializationIds: ObjectId[];
    durationInMinutes?: number;
    isPrimary?: true;
}
