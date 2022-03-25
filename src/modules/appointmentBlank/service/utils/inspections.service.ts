import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { Inspections } from '../../model/parts/inspections.model';

@Injectable()
export class InspectionsService extends BasicService<Inspections> {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {
        super();
        this.dbService = this.database.collection('inspections');
        this.basicLookups = [
            {
                from: 'doctor',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doctor',
                isArray: false,
            },
            {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                isArray: false,
            },
            {
                from: 'session',
                localField: 'sessionId',
                foreignField: '_id',
                as: 'session',
                isArray: false,
            },
        ];
    }

    async edit(args: {
        inspections: string[];
        doctorId: ObjectId;
        inspectionId: ObjectId;
    }) {
        const { inspections, inspectionId, doctorId } = args;
        const inspection = await this.updateOne({
            find: { _id: inspectionId, doctorId },
            update: { inspections },
            method: '$set',
        });
        return inspection;
    }
}
