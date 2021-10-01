import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BookingService } from 'src/modules/booking/service/booking.service';
import { SessionAddictive } from '../model/session.addictive';
import { Session } from '../model/session.interface';

@Injectable()
export class SessionService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
    ) {}

    private get sessionCollection() {
        return this.database.collection('session');
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
                                    from: 'testResults',
                                    localField: 'userId',
                                    foreignField: 'userId',
                                    as: 'testResults',
                                },
                            },
                            {
                                $lookup: {
                                    from: 'doctor',
                                    localField: 'doctorId',
                                    foreignField: '_id',
                                    as: 'doctor'
                                }
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
                                    testResults: {
                                        $arrayElemAt: ['$testResults', 0],
                                    }
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
            testResults: sessionArray[0].booking.testResults
        } as SessionAddictive;
        return session;
    }

    async create(bookingId: string): Promise<Session> {
        const currentDate = new Date();
        const session: Session = {
            bookingId: new ObjectId(bookingId),
            startDate: currentDate,
        };
        const insertSession = await this.sessionCollection.insertOne(session);
        session._id = insertSession.insertedId;
        return session;
    }
}
