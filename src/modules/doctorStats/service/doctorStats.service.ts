import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { DoctorSpecStats } from '../model/doctorStats.interface';

@Injectable()
export class DoctorStatsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get sessionCollection() {
        return this.database.collection('session');
    }

    async getStatsOfDoctorsByPeriodOfTimeAndSpec(args: {
        firstDate: Date;
        secondDate: Date;
        specializationId: ObjectId;
    }) {
        const { firstDate, secondDate, specializationId } = args;
        const stats = await this.sessionCollection
            .aggregate<DoctorSpecStats>([
                {
                    $match: {
                        startDate: { $gte: firstDate },
                        endDate: { $lte: secondDate },
                    },
                },
                {
                    $lookup: {
                        from: 'service',
                        let: {
                            serviceId: '$serviceId',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$_id', '$$serviceId'] },
                                            {
                                                $in: [
                                                    specializationId,
                                                    '$specializationIds',
                                                ],
                                            },
                                        ],
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
                    $lookup: {
                        from: 'specialization',
                        let: {
                            id: '$_id',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', specializationId],
                                    },
                                },
                            },
                        ],
                        as: 'specialization',
                    },
                },
                {
                    $addFields: {
                        doctor: {
                            $first: '$doctors',
                        },
                    },
                },
                {
                    $group: {
                        _id: '$doctor',
                        totalMoneyEarnt: {
                            $sum: '$service.price',
                        },
                        totalNumOfSessions: {
                            $sum: 1,
                        },
                        specializations: {
                            $first: '$specialization',
                        },
                    },
                },
                {
                    $addFields: {
                        doctor: '$_id',
                        specialization: {
                            $first: '$specializations',
                        },
                    },
                },
                {
                    $sort: {
                        totalMoneyEarnt: -1,
                    },
                },
            ])
            .toArray();
        return stats;
    }

    async getStatsOfDoctorByPeriodsOfTime(args: {
        doctorId: ObjectId;
        firstDate: Date;
        secondDate: Date;
    }) {
        const { doctorId, firstDate, secondDate } = args;
        const stats = await this.sessionCollection
            .aggregate<DoctorSpecStats>([
                {
                    $match: {
                        doctorId: doctorId,
                        startDate: { $gte: firstDate },
                        endDate: { $lte: secondDate },
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
                    $lookup: {
                        from: 'service',
                        localField: 'serviceId',
                        foreignField: '_id',
                        as: 'services',
                    },
                },
                {
                    $addFields: {
                        doctor: {
                            $first: '$doctors',
                        },
                        service: {
                            $first: '$services',
                        },
                    },
                },
                {
                    $group: {
                        _id: '$doctor',
                        totalMoneyEarnt: {
                            $sum: '$service.price',
                        },
                        totalNumOfSessions: {
                            $sum: 1,
                        },
                    },
                },
                {
                    $addFields: {
                        doctor: '$_id',
                    },
                },
            ])
            .toArray();
        return stats[0];
    }
}
