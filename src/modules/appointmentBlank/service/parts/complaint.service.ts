import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { Complaint } from '../../model/parts/complaint.model';

@Injectable()
export class ComplaintService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get complaintCollection() {
        return this.database.collection('complaint');
    }

    async findOne(args: Partial<Complaint>) {
        const complaint = await this.complaintCollection.findOne<Complaint>(
            args,
        );
        return complaint;
    }

    async findWithAddictives(args: Partial<Complaint>) {
        const complaints = await this.complaintCollection
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
        return complaints;
    }
}
