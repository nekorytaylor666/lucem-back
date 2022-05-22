import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class SpecializationStatsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get sessionCollection() {
        return this.database.collection('session');
    }

    async getSpecializationStatsByPeriodOfTime(args: {
        firstDate: Date;
        secondDate: Date;
    }) {
        const { firstDate, secondDate } = args;
        const stats = await this.sessionCollection
            .aggregate([
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
                { $unwind: '$service' },
                {
                    $addFields: {
                        doctor: {
                            $first: '$doctors',
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            doctor: '$doctor',
                            specialization: '$service.specialization',
                        },
                        totalSum: {
                            $sum: '$service.price',
                        },
                        services: {
                            $push: {
                                data: '$service',
                            },
                        },
                        count: {
                            $first: 1,
                        },
                    },
                },
                {
                    $addFields: {
                        serviceCount: {
                            $size: '$services',
                        },
                    },
                },
                {
                    $group: {
                        _id: '$_id.specialization',
                        totalSum: {
                            $sum: '$totalSum',
                        },
                        individualSpecialistNum: {
                            $sum: '$count',
                        },
                        totalNumSessions: {
                            $sum: '$serviceCount',
                        },
                    },
                },
                {
                    $project: {
                        specialization: '$_id',
                        individualSpecialistNum: 1,
                        totalNumSessions: 1,
                        totalMoneyEarnt: '$totalSum',
                    },
                },
            ])
            .toArray();
        return stats;
    }
}
