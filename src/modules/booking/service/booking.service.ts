import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { TimelineService } from 'src/modules/timeline/service/timeline.service';
import { Booking, BookingProgress } from '../model/booking.interface';
import { CreateBooking } from '../model/createBooking.args';

@Injectable()
export class BookingService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private timelineService: TimelineService,
    ) {}

    private get bookingCollection() {
        return this.database.collection<Booking>('booking');
    }

    async findOne(args: Partial<Booking>) {
        const booking = this.bookingCollection.findOne<Booking>(args);
        return booking;
    }

    findWithOptionsCursor(args: { fields: (keyof Booking)[]; values: any[] }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const bookings = this.bookingCollection
            .find(findQuery)
            .sort({ startDate: 1 });
        return bookings;
    }

    async findWithOptions(args: { fields: (keyof Booking)[]; values: any[] }) {
        const { fields, values } = args;
        const query: { [index: string]: any } = {};
        fields.map((val, ind) => (query[val] = values[ind]));
        const bookings = await this.bookingCollection.find(query).toArray();
        return bookings;
    }

    findWithAddictivesCursor(args: {
        fields: (keyof Booking)[];
        values: any[];
    }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const bookingCursor = this.bookingCollection.aggregate([
            { $match: findQuery },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $lookup: {
                    from: 'service',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as: 'service',
                },
            },
            {
                $lookup: {
                    from: 'doctor',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctor',
                },
            },
            { $sort: { startDate: 1 } },
            {
                $project: {
                    service: {
                        $arrayElemAt: ['$service', 0],
                    },
                    doctor: {
                        $arrayElemAt: ['$doctor', 0],
                    },
                    user: {
                        $arrayElemAt: ['$user', 0],
                    },
                    _id: 1,
                    serviceId: 1,
                    userId: 1,
                    timelineId: 1,
                    startDate: 1,
                    endDate: 1,
                    doctorId: 1,
                    progress: 1,
                },
            },
        ]);
        return bookingCursor;
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
        const insertBooking = await this.bookingCollection.insertOne(booking);
        booking._id = insertBooking.insertedId;
        return booking;
    }

    async find(args: Partial<Booking>) {
        const bookings = await this.bookingCollection
            .find<Booking>(args)
            .toArray();
        return bookings;
    }

    async updateOne(args: {
        findFields: (keyof Booking)[];
        findValue: any[];
        updateFields: (keyof Booking)[];
        updateValues: any[];
        method: '$set' | '$inc' | '$addToSet';
    }) {
        const { findFields, findValue, updateFields, updateValues, method } =
            args;
        const findQuery: { [index: string]: any } = {};
        findFields.map((val, ind) => (findQuery[val] = findValue[ind]));
        const updateFieldsValues: { [index: string]: any } = {};
        updateFields.map(
            (val, ind) => (updateFieldsValues[val] = updateValues[ind]),
        );
        const updateQuery = {
            [method]: updateFieldsValues,
        };
        const booking = await this.bookingCollection.findOneAndUpdate(
            findQuery,
            updateQuery,
            { returnDocument: 'after' },
        );
        return booking.value;
    }
}
