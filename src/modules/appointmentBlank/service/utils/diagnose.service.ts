import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Diagnose } from '../../model/parts/diagnose.model';

@Injectable()
export class DiagnoseService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get diagnoseCollection() {
        return this.database.collection('diagnose');
    }

    async findOne(args: Partial<Diagnose>) {
        const diagnose = await this.diagnoseCollection.findOne<Diagnose>(args);
        return diagnose;
    }

    async findOneWithAddictives(args: Partial<Diagnose>) {
        const diagnoses = await this.diagnoseCollection
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
        return diagnoses;
    }
}
