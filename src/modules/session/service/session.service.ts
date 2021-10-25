import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BookingProgress } from 'src/modules/booking/model/booking.interface';
import { BookingService } from 'src/modules/booking/service/booking.service';
import { SessionAddictive } from '../model/session.addictive';
import { Session } from '../model/session.interface';

@Injectable()
export class SessionService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
        private bookingService: BookingService,
    ) {}

    private get sessionCollection() {
        return this.database.collection('session');
    }

    async findOne(args: Partial<Session>) {
        const session = await this.sessionCollection.findOne(args);
        return session;
    }

    async updateOne(args: {
        findFields: (keyof Session)[];
        findValues: any[];
        updateFields: (keyof Session)[];
        updateValues: any[];
        method: '$set' | '$inc' | '$addToSet' | '$push';
    }): Promise<Session> {
        const { findFields, findValues, updateFields, updateValues, method } =
            args;
        const findQuery: any = {};
        findFields.map((val, ind) => (findQuery[val] = findValues[ind]));
        const updateFieldsValues: any = {};
        updateFields.map(
            (val, ind) => (updateFieldsValues[val] = updateValues[ind]),
        );
        const updateQuery = {
            [method]: updateFieldsValues,
        };
        const session = await this.sessionCollection.findOneAndUpdate(
            findQuery,
            updateQuery,
            { returnDocument: 'after' },
        );
        return session.value as Session;
    }

    findWithAddictives(args: { fields: (keyof Session)[]; values: any[] }) {
        const { fields, values } = args;
        const findQuery: any = {};
        fields.map((val, ind) => (findQuery[val] = values[ind]));
        const session = this.sessionCollection.aggregate([
            {
                $match: findQuery,
            },
            {
                $lookup: {
                    from: 'booking',
                    let: {
                        bookingId: '$bookingId',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$bookingId'],
                                },
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
                                from: 'user',
                                localField: 'userId',
                                foreignField: '_id',
                                as: 'user',
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
                        {
                            $project: {
                                _id: 1,
                                startDate: 1,
                                user: {
                                    $arrayElemAt: ['$user', 0],
                                },
                                service: {
                                    $arrayElemAt: ['$service', 0],
                                },
                                doctor: {
                                    $arrayElemAt: ['$doctor', 0],
                                },
                                userId: 1,
                            },
                        },
                    ],
                    as: 'booking',
                },
            },
            {
                $sort: { startDate: -1 },
            },
            {
                $unwind: '$booking',
            },
        ]);
        return session;
    }

    async findActiveSession(userId: string): Promise<SessionAddictive> {
        const sessionArray = await this.sessionCollection
            .aggregate([
                {
                    $match: {
                        endDate: {
                            $exists: false,
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'booking',
                        let: {
                            bookingId: '$bookingId',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    '$userId',
                                                    new ObjectId(userId),
                                                ],
                                            },
                                            { $eq: ['$_id', '$$bookingId'] },
                                        ],
                                    },
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
                                    from: 'user',
                                    localField: 'userId',
                                    foreignField: '_id',
                                    as: 'user',
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
                            {
                                $project: {
                                    _id: 1,
                                    startDate: 1,
                                    user: {
                                        $arrayElemAt: ['$user', 0],
                                    },
                                    service: {
                                        $arrayElemAt: ['$service', 0],
                                    },
                                    doctor: {
                                        $arrayElemAt: ['$doctor', 0],
                                    },
                                },
                            },
                        ],
                        as: 'booking',
                    },
                },
                {
                    $unwind: '$booking',
                },
            ])
            .toArray();
        const session: SessionAddictive = {
            ...sessionArray[0],
        } as SessionAddictive;
        return session;
    }

    async endSession(sessionId: string) {
        const session = await this.updateOne({
            findFields: ['_id'],
            findValues: [new ObjectId(sessionId)],
            updateFields: ['endDate'],
            updateValues: [new Date()],
            method: '$set',
        });
        await this.bookingService.updateOne({
            findFields: ['_id'],
            findValue: [session.bookingId],
            updateFields: ['progress'],
            updateValues: [BookingProgress.Done],
            method: '$set',
        });
        return session;
    }

    async create(bookingId: string): Promise<Session> {
        const currentDate = new Date();
        const booking = await this.bookingService.findOne({
            _id: new ObjectId(bookingId),
        });
        const previousSessions = await this.sessionCollection
            .aggregate([
                {
                    $match: {
                        endDate: {
                            $exists: true,
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'booking',
                        let: {
                            bookingId: '$bookingId',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    '$userId',
                                                    booking.userId,
                                                ],
                                            },
                                            {
                                                $eq: [
                                                    '$doctorId',
                                                    booking.doctorId,
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'bookings',
                    },
                },
                {
                    $unwind: '$bookings',
                },
            ])
            .toArray();
        const session: Session = {
            bookingId: new ObjectId(bookingId),
            startDate: currentDate,
            count:
                previousSessions.length !== 0
                    ? previousSessions.length + 1
                    : undefined,
        };
        const insertSession = await this.sessionCollection.insertOne(session, {
            ignoreUndefined: true,
        });
        session._id = insertSession.insertedId;
        await this.bookingService.updateOne({
            findFields: ['_id'],
            findValue: [new ObjectId(bookingId)],
            updateFields: ['progress'],
            updateValues: [BookingProgress.Ongoing],
            method: '$set',
        });
        return session;
    }
}
