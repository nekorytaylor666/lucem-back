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
        ];
    }

    async edit(args: {
        preliminary?: boolean;
        deseaseDBCode?: string;
        diagnose?: string;
        natureOfTheDesease?: string;
        diagnoseId: ObjectId;
        doctorId: ObjectId;
    }): Promise<Diagnose> {
        const { diagnoseId, doctorId } = args;
        delete args['diagnoseId'];
        delete args['doctorId'];
        removeUndefinedFromObject(args);
        const diagnose = await this.updateOne({
            find: { _id: diagnoseId, doctorId },
            update: args,
            method: '$set',
        });
        return diagnose;
    }
}
