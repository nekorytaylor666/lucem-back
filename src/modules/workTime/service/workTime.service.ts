import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { parseTime } from 'src/utils/parseTime';
import { WorkTimeDateInput } from '../model/workTime.input';
import { WorkTime } from '../model/workTime.interface';

@Injectable()
export class WorkTimeService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get workTimeCollection() {
        return this.database.collection<WorkTime>('workTime');
    }

    async findOneWithOptions(args: {
        fields: (keyof WorkTime)[];
        values: any[];
    }) {
        const { fields, values } = args;
        const query: { [index: string]: any } = {};
        fields.map((val, ind) => (query[val] = values[ind]));
        const workTime = await this.workTimeCollection.findOne(query);
        return workTime;
    }

    async findWithOptions(args: { fields: (keyof WorkTime)[]; values: any[] }) {
        const { fields, values } = args;
        const query: { [index: string]: any } = {};
        fields.map((val, ind) => (query[val] = values[ind]));
        const workTimes = await this.workTimeCollection.find(query).toArray();
        return workTimes;
    }

    async updateOne(args: {
        find: Partial<WorkTime>;
        update: Partial<WorkTime>;
        method: '$inc' | '$push' | '$addToSet' | '$set';
    }) {
        const { find, update, method } = args;
        const updateQuery = {
            [method]: update,
        };
        const workTime = await this.workTimeCollection.findOneAndUpdate(
            find,
            updateQuery,
            { returnDocument: 'after' },
        );
        return workTime.value;
    }

    async create(args: { dates: WorkTimeDateInput[]; doctorId: string }) {
        const { dates, doctorId: _doctorId } = args;
        const doctorId = new ObjectId(_doctorId);
        const workingTimes = dates.map((val) => {
            const { startTime: _startTime, endTime: _endTime } = val;
            const [startTime, endTime] = [
                parseTime(_startTime),
                parseTime(_endTime),
            ];
            const workingTime: WorkTime = {
                _id: new ObjectId(),
                startTime,
                endTime,
                doctorId,
            };
            return workingTime;
        });
        await this.workTimeCollection.insertMany(workingTimes);
        return workingTimes;
    }
}
