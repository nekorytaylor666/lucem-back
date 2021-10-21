import { ObjectId } from "mongodb";

export interface Rating {
    _id?: ObjectId,
    rating: number,
    userId: ObjectId,
    doctorId: ObjectId,
    comment?: string;
}