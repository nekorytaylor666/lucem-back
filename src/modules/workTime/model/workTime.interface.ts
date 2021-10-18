import { ObjectId } from 'mongodb';

export interface WorkTime {
    _id: ObjectId;
    doctorId: ObjectId;
    startTime: Date;
    endTime: Date;
}
