import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { Complaint } from '../../model/parts/complaint.model';

@Injectable()
export class ComplaintService extends BasicService<Complaint> {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {
        super();
        this.dbService = this.database.collection('complaint');
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
        sessionId: ObjectId;
        complaint?: string;
        sicknessTimeDuration?: string;
        reason?: string;
        doctorId: ObjectId;
    }) {
        const { complaint, reason, sicknessTimeDuration, doctorId, sessionId } =
            args;
        const newComplaint: Partial<Complaint> = {
            complaint,
            reason,
            sicknessTimeDuration,
        };
        removeUndefinedFromObject(newComplaint);
        const complaintResponce = this.updateOne({
            find: { sessionId, doctorId },
            update: newComplaint,
            method: '$set',
        });
        return complaintResponce;
    }
}
