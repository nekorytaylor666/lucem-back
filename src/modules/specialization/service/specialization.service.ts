import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { AWSservice } from 'src/modules/helpers/uploadFiles/aws/AWS.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { Specialization } from '../model/specialization.interface';

@Injectable()
export class SpecializationService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private photoUploadService: AWSservice,
    ) {}

    private get specializationCollection() {
        return this.database.collection('specialization');
    }

    async create(args: CreateSpecialization) {
        const { image, name, description } = args;
        const photoURL =
            image &&
            (await this.photoUploadService.saveImages(
                (await image).createReadStream(),
            ));
        const specialization: Specialization = {
            photoURL,
            name,
            description
        };
        const insertSpecialization = await this.specializationCollection.insertOne(specialization);
        specialization._id = insertSpecialization.insertedId;
        return specialization;
    }
}
