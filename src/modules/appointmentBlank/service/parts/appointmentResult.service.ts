import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppointmentResults } from '../../model/parts/AppointmenResults.model';

@Injectable()
export class AppointmenResultsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get appointmentResultsCollection() {
        return this.database.collection('appointmentResults');
    }

    async find(args: Partial<AppointmentResults>) {
        const appointmentResults = await this.appointmentResultsCollection
            .find(args)
            .toArray();
        return appointmentResults;
    }

    async findWithAddictives(args: Partial<AppointmentResults>) {
        const appointmentResults = await this.appointmentResultsCollection
            .aggregate([
                {
                    $match: args,
                },
                {
                    $lookup: {
                        from: 'doctor',
                        localField: 'doctorId',
                        foreignField: '_id',
                        as: 'doctors',
                    },
                },
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users',
                    },
                },
                {
                    $lookup: {
                        from: 'session',
                        localField: 'sessionId',
                        foreignField: '_id',
                        as: 'sessions',
                    },
                },
                {
                    $addFields: {
                        user: {
                            $arrayElemAt: ['$users', 0],
                        },
                        doctor: {
                            $arrayElemAt: ['$doctors', 0],
                        },
                        session: {
                            $arrayElemAt: ['$sessions', 0],
                        },
                    },
                },
            ])
            .toArray();
        return appointmentResults;
    }
}
