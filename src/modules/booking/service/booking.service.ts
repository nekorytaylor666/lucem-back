import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { Timeline } from 'src/modules/timeline/model/timeline.interface';
import { TimelineService } from 'src/modules/timeline/service/timeline.service';
import { Booking } from '../model/booking.interface';
import { CreateBooking } from '../model/createBooking.args';

@Injectable()
export class BookingService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private timelineService: TimelineService,
    ) {}

    private get bookingCollection() {
        return this.database.collection('booking');
    }

    async findOne(args: Partial<Booking>) {
        const booking = this.bookingCollection.findOne<Booking>(args);
        return booking;
    }

    async findWithOptionsCursor(args: {
        fields: (keyof Booking)[];
        values: any[];
    }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const bookings = await this.bookingCollection
            .find(findQuery)
            .sort({ startDate: 1 });
        return bookings;
    }

    async create(args: CreateBooking & { userId: string }) {
        const {
            serviceId: _serviceId,
            userId: _userId,
            timelineId: _timelineId,
            startDate: _startDate,
            endDate: _endDate,
            doctorId: _doctorId,
        } = args;
        const [serviceId, userId, timelineId, doctorId, startDate, endDate] = [
            new ObjectId(_serviceId),
            new ObjectId(_userId),
            new ObjectId(_timelineId),
            new ObjectId(_doctorId),
            new Date(_startDate),
            new Date(_endDate),
        ];
        const checkIfTimeIsTaken =
            await this.bookingCollection.findOne<Booking>({
                timelineId,
                startDate: { $lte: startDate },
                endDate: { $gte: endDate },
            });
        if (checkIfTimeIsTaken)
            throw new ApolloError('the time is already booked');

        const timeline = await this.timelineService.findOne({
            _id: timelineId,
        });
        if (timeline.startDate > startDate || timeline.endDate < endDate)
            throw new ApolloError("doctor doesn't work during this time");
        const booking: Booking = {
            serviceId,
            userId,
            startDate,
            endDate,
            timelineId,
            doctorId,
        };
        const insertBooking = await this.bookingCollection.insertOne(booking);
        booking._id = insertBooking.insertedId;
        return booking;
    }
}
