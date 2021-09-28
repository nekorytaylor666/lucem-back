import { ObjectId } from "mongodb";


export interface Booking {
    _id?: ObjectId;
    serviceId?: ObjectId;
    userId: ObjectId;
    timelineId: ObjectId;
    startDate: Date;
    endDate: Date;
    doctorId: ObjectId;
}