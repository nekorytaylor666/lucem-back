import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Inspections } from '../../model/parts/inspections.model';

@Injectable()
export class InspectionsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get inspectionsCollection() {
        return this.database.collection('inspection');
    }

    async findOneWithAddictions(args: Partial<Inspections>) {
        const inspections = await this.inspectionsCollection
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
        return inspections;
    }
}
