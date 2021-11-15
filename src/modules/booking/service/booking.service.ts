import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { TimelineService } from 'src/modules/timeline/service/timeline.service';
import { BookingAddictive } from '../model/booking.addictive';
import { Booking, BookingProgress } from '../model/booking.interface';
import { CreateBooking } from '../model/createBooking.args';

@Injectable()
export class BookingService extends BasicService<Booking> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private timelineService: TimelineService,
    ) {
        super();
        this.dbService = this.database.collection<Booking>('booking');
        this.basicLookups = [
            {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                isArray: false,
            },
            {
                from: 'service',
                localField: 'serviceId',
                foreignField: '_id',
                as: 'service',
                isArray: false,
            },
            {
                from: 'doctor',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doctor',
                isArray: false,
            },
        ];
    }

    async getBookingsByDoctorIdAndDates(args: {
        doctorId: ObjectId;
        firstDate: Date;
        secondDate: Date;
    }) {
        const { doctorId, firstDate, secondDate } = args;
        const bookings = await this.findWithAddictivesCursor<BookingAddictive>({
            matchQuery: {
                doctorId: doctorId,
                startDate: { $gte: firstDate, $lte: secondDate },
            },
            lookups: this.basicLookups,
        }).toArray();
        return bookings;
    }

    async create(args: CreateBooking & { userId: string }) {
        const {
            serviceId: _serviceId,
            userId: _userId,
            timelineId: _timelineId,
            startDate,
            endDate,
            doctorId: _doctorId,
        } = args;
        const [serviceId, userId, timelineId, doctorId] = [
            new ObjectId(_serviceId),
            new ObjectId(_userId),
            new ObjectId(_timelineId),
            new ObjectId(_doctorId),
        ];
        const checkIfTimeIsTaken = await this.findOneWithOptions({
            fields: ['timelineId', 'startDate', 'endDate'],
            values: [timelineId, { $lte: startDate }, { $gte: endDate }],
        });
        if (checkIfTimeIsTaken)
            throw new ApolloError('the time is already booked');
        const timeline = await this.timelineService.findOne({
            _id: timelineId,
            doctorId,
        });
        if (
            timeline.startDate > startDate ||
            timeline.endDate < endDate ||
            timeline.isVacation
        )
            throw new ApolloError("doctor doesn't work during this time");
        const booking: Booking = {
            serviceId,
            userId,
            startDate,
            endDate,
            timelineId,
            doctorId,
            progress: BookingProgress.Upcoming,
        };
        const insertBooking = await this.insertOne(booking);
        booking._id = insertBooking;
        return booking;
    }

    async findUpcomingBookingsOfDoctor(args: {
        currentDate: Date;
        doctorId: ObjectId;
    }) {
        const { currentDate, doctorId } = args;
        const bookings = this.findWithAddictivesCursor<BookingAddictive>({
            matchQuery: {
                doctorId: doctorId,
                startDate: { $gt: currentDate },
            },
            lookups: this.basicLookups,
        }).toArray();
        return bookings;
    }

    findUpcomingBookingsCursor(currentDate: Date) {
        const bookings = this.findWithAddictivesCursor<BookingAddictive>({
            matchQuery: {
                startDate: { $gt: currentDate },
            },
            lookups: this.basicLookups,
        });
        return bookings;
    }
}
