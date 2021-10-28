import { ObjectId } from 'mongodb';

export interface Destination {
    bookingId?: ObjectId;
    serviceId?: ObjectId;
    endDate?: Date;
}
