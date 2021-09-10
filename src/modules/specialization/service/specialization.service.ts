import { Inject, Injectable } from '@nestjs/common';
import { Db, FindCursor, ObjectId } from 'mongodb';
import { AWSservice } from 'src/modules/helpers/uploadFiles/aws/AWS.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { SpecializationAddictive } from '../model/specialization.addictive';
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
            description,
        };
        const insertSpecialization =
            await this.specializationCollection.insertOne(specialization);
        specialization._id = insertSpecialization.insertedId;
        return specialization;
    }

    async findOneWithAddictives(_id: string) {
        const id = new ObjectId(_id);
        const specialization = await this.specializationCollection.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
            {
                $lookup: {
                    from: 'specializationDoctor',
                    let: {
                        id: '$_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$specializationId', '$$id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'doctor',
                                localField: 'doctorId',
                                foreignField: '_id',
                                as: 'doctor',
                            },
                        },
                        {
                            $project: {
                                doctor: {
                                    $arrayElemAt: ['$doctor', 0],
                                },
                            },
                        },
                    ],
                    as: 'specializationDoctor',
                },
            },
        ]).toArray();
        const specializationAddictive: SpecializationAddictive = {
            _id: specialization[0]._id,
            name: specialization[0].name,
            photoURL: specialization[0].photoURL,
            doctors: specialization[0].specializationDoctor.map((val) => val.doctor),
            description: specialization[0].description,
        }
        return specializationAddictive;
    }
}
