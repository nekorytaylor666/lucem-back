import { ObjectId } from 'mongodb';

export interface Session {
    _id?: ObjectId;
    bookingId: ObjectId;
    startDate: Date;
    endDate?: Date;
    count: number;
    serviceId: ObjectId;
    doctorId: ObjectId;
    userId: ObjectId;
}
