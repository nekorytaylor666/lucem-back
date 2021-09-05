import { ObjectId } from "mongodb";


export interface Appointment {
    _id?: ObjectId;
    serviceId: ObjectId;
    date: Date;
    userId: ObjectId;
};