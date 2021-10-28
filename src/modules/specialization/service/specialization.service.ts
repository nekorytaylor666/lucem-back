import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { SpecializationAddictive } from '../model/specialization.addictive';
import { Specialization } from '../model/specialization.interface';

@Injectable()
export class SpecializationService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private photoUploadService: ImageUploadService,
    ) {}

    private get specializationCollection() {
        return this.database.collection('specialization');
    }

    async list() {
        return await this.specializationCollection.find().toArray();
    }

    async listWithAddictives() {
        const specialization = await this.specializationCollection
            .aggregate([
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
                                    let: {
                                        doctorId: '$doctorId',
                                    },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ['$_id', '$$doctorId'],
                                                },
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: 'timeline',
                                                localField: '_id',
                                                foreignField: 'doctorId',
                                                as: 'timeline',
                                            },
                                        },
                                    ],
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
                {
                    $lookup: {
                        from: 'service',
                        localField: '_id',
                        foreignField: 'specializationId',
                        as: 'services',
                    },
                },
            ])
            .toArray();
        const specializationAddictive = specialization.map((val) => {
            return {
                _id: val._id,
                name: val.name,
                photoURL: val.photoURL,
                doctors: val.specializationDoctor.map((val) => val.doctor),
                description: val.description,
                services: val.services,
            } as SpecializationAddictive;
        });
        return specializationAddictive;
    }

    async create(args: CreateSpecialization, req: string) {
        const { image, name, description } = args;
        const photoURL =
            image &&
            (await this.photoUploadService.storeImages(
                (await image).createReadStream(),
                req,
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
        const specialization = await this.specializationCollection
            .aggregate([
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
                                    let: {
                                        doctorId: '$doctorId',
                                    },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ['$_id', '$$doctorId'],
                                                },
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: 'timeline',
                                                localField: '_id',
                                                foreignField: 'doctorId',
                                                as: 'timeline',
                                            },
                                        },
                                    ],
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
                {
                    $lookup: {
                        from: 'service',
                        localField: '_id',
                        foreignField: 'specializationId',
                        as: 'services',
                    },
                },
            ])
            .toArray();
        const specializationAddictive: SpecializationAddictive = {
            _id: specialization[0]._id,
            name: specialization[0].name,
            photoURL: specialization[0].photoURL,
            doctors: specialization[0].specializationDoctor.map(
                (val) => val.doctor,
            ),
            services: specialization[0].services,
            description: specialization[0].description,
        };
        return specializationAddictive;
    }
}
