import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Modify } from 'src/utils/modifyType';
import { SpecializationDoctor } from '../model/specializationDoctor.interface';

@Injectable()
export class SpecializationDoctorService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get specializationDoctorCollection() {
        return this.database.collection('specializationDoctor');
    }

    async create(args: { doctorId: string; specializationId: string }) {
        const [doctorId, specializationId] = [
            new ObjectId(args.doctorId),
            new ObjectId(args.specializationId),
        ];
        const specDoc: SpecializationDoctor = {
            specializationId,
            doctorId
        };
        const insertSpecDoc = await this.specializationDoctorCollection.insertOne(specDoc);
        specDoc._id = insertSpecDoc.insertedId;
        return specDoc;
    }
}
