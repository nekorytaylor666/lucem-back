import { ObjectId } from "mongodb";


export interface Forwards {
    _id: ObjectId;
    doctorId: ObjectId;
    serviceIds: ObjectId[];
    userId: ObjectId;
    dateAdded: Date;
}