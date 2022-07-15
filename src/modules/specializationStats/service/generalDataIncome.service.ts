import { Inject, Injectable } from '@nestjs/common';
import { Args, GraphQLISODateTime } from '@nestjs/graphql';
import { Db } from 'mongodb';

@Injectable()
export class GeneralDataIncomeService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}
    private get sessionCollection() {
        return this.database.collection('session');
    }
    async getSessionGeneral(firstDate: Date, secondDate: Date) {
        const cursor = this.sessionCollection.aggregate([
            {
                $match: {
                    startDate: {
                        $gte: firstDate,
                    },
                    endDate: {
                        $lte: secondDate,
                    },
                },
            },
            {
                $lookup: {
                    from: 'service',
                    let: { serviceId: '$serviceId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$serviceId'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'specialization',
                                let: {
                                    specializationIds: '$specializationIds',
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $in: [
                                                    '$_id',
                                                    '$$specializationIds',
                                                ],
                                            },
                                        },
                                    },
                                ],
                                as: 'specializations',
                            },
                        },
                        {
                            $addFields: {
                                specialization: {
                                    $first: '$specializations',
                                },
                            },
                        },
                    ],
                    as: 'service',
                },
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
                $addFields: {
                    doctor: {
                        $first: '$doctors',
                    },
                },
            },
        ]);
        const _ret = await cursor.toArray();
        cursor.close();
        return _ret;
    }
}
