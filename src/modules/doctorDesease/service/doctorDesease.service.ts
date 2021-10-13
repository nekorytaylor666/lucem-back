import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Modify } from 'src/utils/modifyType';
import { DoctorDesease } from '../model/doctorDesease.interface';

@Injectable()
export class DoctorDeseaseService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get doctorDeseaseCollection() {
        return this.database.collection('doctorDesease');
    }

    async create(
        args: Modify<DoctorDesease, { doctorId: string; deseaseId: string }>,
    ) {
        const { deseaseId: _deseaseId, doctorId: _doctorId } = args;
        const [deseaseId, doctorId] = [
            new ObjectId(_deseaseId),
            new ObjectId(_doctorId),
        ];
        const doctorDesease: DoctorDesease = {
            doctorId,
            deseaseId,
        };
        const insertDoctorDesease =
            await this.doctorDeseaseCollection.insertOne(doctorDesease);
        doctorDesease._id = insertDoctorDesease.insertedId;
        return doctorDesease;
    }
}
