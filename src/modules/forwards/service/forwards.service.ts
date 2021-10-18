import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Forwards } from '../model/forwards.interface';

@Injectable()
export class ForwardsService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get forwardsCollection() {
        return this.database.collection<Forwards>('forwards');
    }

    findWithAddictivesCursor(args: Partial<Forwards>) {
        const cursor = this.forwardsCollection.aggregate([
            { $match: args },
            {
                $lookup: {
                    from: 'doctor',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctor',
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
                $lookup: {
                    from: 'service',
                    let: {
                        serviceIds: '$serviceIds',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$serviceIds'],
                                },
                            },
                        },
                    ],
                    as: 'services',
                },
            },
            {
                $project: {
                    _id: 1,
                    dateAdded: 1,
                    user: {
                        $arrayElemAt: ['$user', 0],
                    },
                    services: 1,
                    doctor: {
                        $arrayElemAt: ['$doctor', 0],
                    },
                },
            },
        ]);
        return cursor;
    }

    async create(args: {
        userId: string;
        serviceIds: string[];
        doctorId: ObjectId;
    }): Promise<Forwards> {
        const { userId: _userId, serviceIds: _serviceIds, doctorId } = args;
        const userId = new ObjectId(_userId);
        const serviceIds = _serviceIds.map((val) => new ObjectId(val));
        const currentDate = new Date();
        const forwards: Forwards = {
            _id: new ObjectId(),
            doctorId,
            serviceIds,
            userId,
            dateAdded: currentDate,
        };
        await this.forwardsCollection.insertOne(forwards);
        return forwards;
    }
}
