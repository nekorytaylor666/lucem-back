import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { Diagnose } from '../../model/parts/diagnose.model';

@Injectable()
export class DiagnoseService extends BasicService<Diagnose> {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {
        super();
        this.dbService = this.database.collection('diagnose');
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
        preliminary?: boolean;
        deseaseDBCode?: string;
        diagnose?: string;
        natureOfTheDesease?: string;
        sessionId: ObjectId;
        doctorId: ObjectId;
    }): Promise<Diagnose> {
        const { sessionId, doctorId } = args;
        delete args['sessionId'];
        delete args['doctorId'];
        removeUndefinedFromObject(args);
        const diagnose = await this.updateOne({
            find: { _id: sessionId, doctorId },
            update: args,
            method: '$set',
        });
        return diagnose;
    }
}
