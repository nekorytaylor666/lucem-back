import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { SessionAddictive } from '../model/session.addictive';
import { Session } from '../model/session.interface';

@Injectable()
export class SessionService extends BasicService<Session> {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private database: Db,
    ) {
        super();
        this.dbService = this.database.collection('session');
        this.basicLookups = [
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
            {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                isArray: false,
            },
            {
                from: 'booking',
                localField: 'bookingId',
                foreignField: '_id',
                as: 'booking',
                isArray: false,
            },
        ];
    }

    private get sessionCollection() {
        return this.database.collection('session');
    }

    async findActiveSession(userId: string): Promise<SessionAddictive> {
        const session = await this.findWithAddictivesCursor<SessionAddictive>({
            matchQuery: {
                endDate: {
                    $exists: false,
                },
                userId: new ObjectId(userId),
            },
            lookups: this.basicLookups,
            sort: {
                startDate: -1,
            },
        }).toArray();
        return session[0];
    }

    getSessionsOfDoctorCursor(doctorId: ObjectId) {
        const sessionsCursor = this.findWithAddictivesCursor<SessionAddictive>({
            matchQuery: {
                endDate: {
                    $exists: false,
                },
                doctorId,
            },
            lookups: this.basicLookups,
            sort: { endDate: -1 },
        });
        return sessionsCursor;
    }

    async getSessionsOfDoctorByPeriodsOfTimeCursor(args: {
        doctorId: ObjectId;
        firstDate: Date;
        secondDate: Date;
    }) {
        const { doctorId, firstDate, secondDate } = args;
        const sessionsCursor =
            await this.findWithAddictivesCursor<SessionAddictive>({
                matchQuery: {
                    endDate: {
                        $lte: secondDate,
                    },
                    startDate: {
                        $gte: firstDate,
                    },
                    doctorId,
                },
                lookups: this.basicLookups,
                sort: {
                    endDate: -1,
                },
            }).toArray();
        return sessionsCursor;
    }

    historyOfSessionsCursor() {
        const sessions = this.findWithAddictivesCursor<SessionAddictive>({
            matchQuery: {
                endDate: {
                    $exists: true,
                },
            },
            lookups: this.basicLookups,
            sort: { endDate: -1 },
        });
        return sessions;
    }

    async endSession(sessionId: string) {
        const session = await this.updateOne({
            find: { _id: new ObjectId(sessionId) },
            update: { endDate: new Date() },
            method: '$set',
        });
        return session;
    }

    sessionsOfUserCursor(userId: ObjectId) {
        const sessionsCursor = this.findWithAddictivesCursor<SessionAddictive>({
            matchQuery: {
                endDate: {
                    $exists: true,
                },
                userId,
            },
            lookups: this.basicLookups,
        });
        return sessionsCursor;
    }

    async create(args: {
        serviceId: ObjectId;
        doctorId: ObjectId;
        userId: ObjectId;
        bookingId?: ObjectId;
    }): Promise<Session> {
        const { serviceId, doctorId, userId, bookingId } = args;
        const currentDate = new Date();
        const previousSessions = await this.findWithOptions({
            fields: ['endDate', 'userId', 'doctorId'],
            values: [
                { $exists: true },
                userId,
                { $elemMatch: { doctorId: { $eq: doctorId } } },
            ],
        });
        const session: Session = {
            bookingId: new ObjectId(bookingId),
            startDate: currentDate,
            count:
                previousSessions.length !== 0
                    ? previousSessions.length + 1
                    : undefined,
            doctorId,
            userId,
            serviceId,
        };
        const insertSession = await this.sessionCollection.insertOne(session, {
            ignoreUndefined: true,
        });
        session._id = insertSession.insertedId;
        return session;
    }

    getSessionsByDoctorsAndUserCursor(args: {
        doctorId: ObjectId;
        userId: ObjectId;
    }) {
        const { userId, doctorId } = args;
        const sessionsCursor = this.findWithAddictivesCursor<SessionAddictive>({
            matchQuery: {
                endDate: {
                    $exists: false,
                },
                userId,
                doctorId,
            },
            lookups: this.basicLookups,
            sort: { endDate: -1 },
        });
        return sessionsCursor;
    }
}
