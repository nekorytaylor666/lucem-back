import { registerEnumType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

export enum BookingProgress {
    Canceled = 'canceled',
    Ongoing = 'ongoing',
    Upcoming = 'upcoming',
    Done = 'done',
}

registerEnumType(BookingProgress, {
    name: 'BookingProgress',
});

export interface Booking {
    _id?: ObjectId;
    serviceId?: ObjectId;
    userId: ObjectId;
    startDate: Date;
    endDate: Date;
    doctorId: ObjectId;
    progress: BookingProgress;
    price: number;
}
