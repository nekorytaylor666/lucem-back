import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApolloError } from 'apollo-server-express';
import { AggregationCursor, Db, ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { WorkTimeService } from 'src/modules/workTime/service/workTime.service';
import { parseTime } from 'src/utils/parseTime';
import { TimelineAddictive } from '../model/timeline.addictive';
import { CreateTimeline } from '../model/timeline.args';
import { Timeline } from '../model/timeline.interface';

@Injectable()
export class TimelineService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private workTimeService: WorkTimeService,
        private doctorService: DoctorService,
    ) {}

    private get timelineCollection() {
        return this.database.collection<Timeline>('timeline');
    }

    @Cron('* * 1 * *')
    async setTimeLines() {
        const doctors = await this.doctorService.list();
        Promise.all(
            doctors.map(async (val) => {
                const workTimes = await this.workTimeService.find({
                    doctorId: val._id,
                });
            }),
        );
    }

    findCursorWithAddictives(
        args: Partial<Timeline>,
    ): AggregationCursor<TimelineAddictive> {
        const currentDate = new Date();
        const timeline = this.timelineCollection.aggregate<TimelineAddictive>([
            {
                $match: {
                    ...args,
                    endDate: {
                        $gt: currentDate,
                    },
                },
            },
            {
                $lookup: {
                    from: 'booking',
                    let: {
                        id: '$_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$timelineId', '$$id'],
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
                            $project: {
                                service: {
                                    $arrayElemAt: ['$service', 0],
                                },

                                _id: 1,
                                userId: 1,
                                startDate: 1,
                                endDate: 1,
                                timelineId: 1,
                            },
                        },
                    ],
                    as: 'booking',
                },
            },
        ]);
        return timeline;
    }

    async create(args: CreateTimeline): Promise<Timeline> {
        const {
            doctorId: _doctorId,
            startDate: _startDate,
            endDate: _endDate,
        } = args;
        const [startDate, endDate] = [new Date(_startDate), new Date(_endDate)];
        const doctorId = new ObjectId(_doctorId);
        const timeLineCheck = await this.timelineCollection.findOne({
            doctorId: doctorId,
            startDate: { $lte: startDate },
            endDate: { $gte: endDate },
        });
        if (timeLineCheck)
            throw new ApolloError(
                'oops! there is already a time line during this date',
            );
        const [startTime, endTime] = [parseTime(startDate), parseTime(endDate)];
        const workTime = await this.workTimeService.findOneWithOptions({
            fields: ['doctorId', 'startTime', 'endTime'],
            values: [doctorId, { $lte: startTime }, { $gte: endTime }],
        });
        if (!workTime)
            throw new ApolloError("his/her working time didn't start");
        const timeline: Timeline = {
            startDate,
            endDate,
            doctorId,
        };
        const insertTimeline = await this.timelineCollection.insertOne(
            timeline,
            { ignoreUndefined: true },
        );
        timeline._id = insertTimeline.insertedId;
        return timeline;
    }

    async findOne(args: Partial<Timeline>): Promise<Timeline> {
        const timeline = await this.timelineCollection.findOne<Timeline>(args);
        return timeline;
    }
}
