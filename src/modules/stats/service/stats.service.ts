import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { AllowedPeriodsOfTime, Stats } from '../model/stats.interface';

@Injectable()
export class StatsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get sessionCollection() {
        return this.database.collection('session');
    }

    private aggregationPipeline(args: {
        firstDate: Date;
        secondDate: Date;
        period: AllowedPeriodsOfTime;
    }) {
        const { firstDate, secondDate, period } = args;
        return [
            { $unwind: '$service' },
            {
                $facet: {
                    individualPatients: [
                        {
                            $group: {
                                _id: '$user',
                            },
                        },
                    ],
                    moneyEarnt: [
                        {
                            $group: {
                                _id: '',
                                totalMoneyEarnt: {
                                    $sum: '$service.price',
                                },
                            },
                        },
                    ],
                    totalSessionNum: [
                        {
                            $group: {
                                _id: '',
                                totalSessionSum: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],
                    peopleData: [
                        {
                            $group: {
                                _id:
                                    period === AllowedPeriodsOfTime.Year
                                        ? {
                                              year: {
                                                  $year: '$endDate',
                                              },
                                              month: {
                                                  $month: '$endDate',
                                              },
                                          }
                                        : {
                                              month: {
                                                  $month: '$endDate',
                                              },
                                              day: {
                                                  $dayOfMonth: '$endDate',
                                              },
                                          },
                                users: {
                                    $push: '$user',
                                },
                            },
                        },
                        {
                            $unwind: '$users',
                        },
                        {
                            $group: {
                                _id:
                                    period === AllowedPeriodsOfTime.Year
                                        ? {
                                              user: '$users',
                                              year: '$_id.year',
                                              month: '$_id.month',
                                          }
                                        : {
                                              user: '$users',
                                              month: '$_id.month',
                                              day: '$_id.day',
                                          },
                            },
                        },
                        {
                            $group: {
                                _id:
                                    period === AllowedPeriodsOfTime.Year
                                        ? {
                                              year: '$_id.year',
                                              month: '$_id.month',
                                          }
                                        : {
                                              month: '$_id.month',
                                              day: '$_id.day',
                                          },
                                count: {
                                    $sum: 1,
                                },
                            },
                        },
                    ],
                    moneyData: [
                        {
                            $group: {
                                _id:
                                    period === AllowedPeriodsOfTime.Year
                                        ? {
                                              year: {
                                                  $year: '$endDate',
                                              },
                                              month: {
                                                  $month: '$endDate',
                                              },
                                          }
                                        : {
                                              month: {
                                                  $month: '$endDate',
                                              },
                                              day: {
                                                  $dayOfMonth: '$endDate',
                                              },
                                          },
                                moneyCount: {
                                    $sum: '$service.price',
                                },
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    peopleDataFiltered: {
                        $map: {
                            input: '$peopleData',
                            as: 'peopleData',
                            in:
                                period === AllowedPeriodsOfTime.Year
                                    ? {
                                          month: '$$peopleData._id.month',
                                          year: '$$peopleData._id.year',
                                          sum: '$$peopleData.count',
                                          type: 'people',
                                      }
                                    : {
                                          day: '$$peopleData._id.day',
                                          month: '$$peopleData._id.month',
                                          sum: '$$peopleData.count',
                                          type: 'people',
                                      },
                        },
                    },
                    moneyDataFiltered: {
                        $map: {
                            input: '$moneyData',
                            as: 'moneyData',
                            in:
                                period === AllowedPeriodsOfTime.Year
                                    ? {
                                          month: '$$moneyData._id.month',
                                          year: '$$moneyData._id.year',
                                          sum: '$$moneyData.moneyCount',
                                          type: 'money',
                                      }
                                    : {
                                          day: '$$moneyData._id.day',
                                          month: '$$moneyData._id.month',
                                          sum: '$$moneyData.moneyCount',
                                          type: 'money',
                                      },
                        },
                    },
                },
            },
            {
                $project: {
                    startDate: firstDate,
                    endDate: secondDate,
                    totalIndividualPatients: {
                        $size: '$individualPatients',
                    },
                    totalMoneyEarnt: {
                        $first: '$moneyEarnt.totalMoneyEarnt',
                    },
                    totalSessionSum: {
                        $first: '$totalSessionNum.totalSessionSum',
                    },
                    data: {
                        $concatArrays: [
                            '$moneyDataFiltered',
                            '$peopleDataFiltered',
                        ],
                    },
                },
            },
        ];
    }

    async getGeneralStatsByPeriodOfTime(args: {
        firstDate: Date;
        secondDate: Date;
        period: AllowedPeriodsOfTime;
    }) {
        const { firstDate, secondDate, period } = args;
        const aggregationPipeline = this.aggregationPipeline({
            firstDate,
            secondDate,
            period,
        });
        const stats = await this.sessionCollection
            .aggregate<Stats>([
                {
                    $match: {
                        startDate: { $gte: firstDate },
                        endDate: { $lte: secondDate },
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
                        from: 'service',
                        localField: 'serviceId',
                        foreignField: '_id',
                        as: 'service',
                    },
                },
                {
                    $addFields: {
                        user: {
                            $first: '$users',
                        },
                    },
                },
                ...aggregationPipeline,
            ])
            .toArray();
        return stats[0];
    }

    async getSpecStatsByPeriodOfTime(args: {
        firstDate: Date;
        secondDate: Date;
        period: AllowedPeriodsOfTime;
        specializationId: ObjectId;
    }) {
        const { firstDate, secondDate, period, specializationId } = args;
        const aggregationPipeline = this.aggregationPipeline({
            firstDate,
            secondDate,
            period,
        });
        const stats = await this.sessionCollection
            .aggregate<Stats>([
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
                        from: 'booking',
                        let: {
                            serviceId: {
                                $first: '$service._id',
                            },
                            bookingId: '$bookingId',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$_id', '$$bookingId'] },
                                            {
                                                $eq: [
                                                    '$serviceId',
                                                    '$$serviceId',
                                                ],
                                            },
                                        ],
                                    },
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
                                $project: {
                                    user: { $first: '$user' },
                                },
                            },
                        ],
                        as: 'booking',
                    },
                },
                {
                    $addFields: {
                        user: '$booking.user',
                    },
                },
                ...aggregationPipeline,
            ])
            .toArray();
        return stats[0];
    }
}
