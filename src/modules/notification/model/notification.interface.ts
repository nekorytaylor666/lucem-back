import { ObjectId } from 'mongodb';

export interface Notification {
    _id: ObjectId;
    status: string;
    recieverId: ObjectId;
}
