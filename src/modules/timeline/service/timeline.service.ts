import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { CreateTimeline } from "../model/timeline.args";
import { Timeline } from "../model/timeline.interface";


@Injectable()
export class TimelineService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get timelineCollection() {
        return this.database.collection('timeline');
    }

    async create(args: CreateTimeline): Promise<Timeline> {
        const { doctorId: _doctorId, startDate: _startDate, endDate: _endDate} = args;
        const [startDate, endDate] = [new Date(_startDate), new Date(_endDate)];
        const doctorId = new ObjectId(_doctorId);
        const timeline: Timeline = {
            startDate,
            endDate,
            doctorId
        };
        const insertTimeline = await this.timelineCollection.insertOne(timeline);
        timeline._id = insertTimeline.insertedId;
        return timeline;
    }

    async findOne(args: Partial<Timeline>): Promise<Timeline> {
        const timeline = await this.timelineCollection.findOne<Timeline>(args);
        return timeline;
    }
    
}