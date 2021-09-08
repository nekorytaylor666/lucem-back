import { Inject, Injectable } from '@nestjs/common';
import { AggregationCursor, Db, ObjectId } from 'mongodb';
import { TimelineAddictive } from '../model/timeline.addictive';
import { CreateTimeline } from '../model/timeline.args';
import { Timeline } from '../model/timeline.interface';

@Injectable()
export class TimelineService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get timelineCollection() {
        return this.database.collection('timeline');
    }

    async findCursorWithAddictives(
        args: Partial<Timeline>,
    ): Promise<AggregationCursor<TimelineAddictive>> {
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
                // $lookup: {
                //     from: 'booking',
                //     localField: '_id',
                //     foreignField: 'timelineId',
                //     as: 'booking',
                // },
                $lookup: {
                    from: "booking",
                    let: {
                        id: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$timelineId", "$$id"]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "service",
                                localField: "serviceId",
                                foreignField: "_id",
                                as: "service"
                            }
                        },
                        {
                            $project: {
                                service: {
                                    $arrayElemAt: ['$service', 0]
                                },
                                
                                _id: 1,
                                userId: 1,
                                startDate: 1,
                                endDate: 1,
                                timelineId: 1
                            }
                        }
                        
                    ],
                    as: "booking"
                }
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
        const timeline: Timeline = {
            startDate,
            endDate,
            doctorId,
        };
        const insertTimeline = await this.timelineCollection.insertOne(
            timeline,
        );
        timeline._id = insertTimeline.insertedId;
        return timeline;
    }

    async findOne(args: Partial<Timeline>): Promise<Timeline> {
        const timeline = await this.timelineCollection.findOne<Timeline>(args);
        return timeline;
    }
}
