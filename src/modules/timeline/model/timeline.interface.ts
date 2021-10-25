import { ObjectId } from 'mongodb';

export interface Timeline {
    _id?: ObjectId;
    doctorId: ObjectId;
    startDate: Date;
    endDate: Date;
    isVacation?: true;
}
