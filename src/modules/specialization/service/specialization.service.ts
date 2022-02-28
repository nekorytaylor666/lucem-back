import { Inject, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { EditSpecialization } from '../model/editSpecialization.args';
import { SpecializationAddictive } from '../model/specialization.addictive';
import { Specialization } from '../model/specialization.interface';

export const SpecializationCollectionName = 'specialization';

@Injectable()
export class SpecializationService extends BasicService<Specialization> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private photoUploadService: ImageUploadService,
    ) {
        super();
        this.dbService =
            this.database.collection<Specialization>('specialization');
        this.basicLookups = [
            {
                from: 'doctor',
                let: {
                    doctorIds: 'doctorIds',
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$doctorIds'],
                            },
                        },
                    },
                ],
                as: 'doctors',
                isArray: true,
            },
            {
                from: 'service',
                localField: '_id',
                foreignField: 'specializationId',
                as: 'services',
                isArray: true,
            },
        ];
    }

    async list() {
        return await this.dbService.find().toArray();
    }

    async listWithAddictives() {
        const specializations = await this.dbService
            .aggregate<SpecializationAddictive>([
                {
                    $addFields: {
                        doctorIds: {
                            $ifNull: ['$doctorIds', ['null']],
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'doctor',
                        let: {
                            doctorIds: '$doctorIds',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$_id', '$$doctorIds'],
                                    },
                                },
                            },
                        ],
                        as: 'doctors',
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
        return specializations;
    }

    async create(args: CreateSpecialization, req: string) {
        const { image, name, description, colorCodeGradient } = args;
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
            colorCodeGradient,
        };
        const insertSpecialization = await this.insertOne(specialization);
        specialization._id = insertSpecialization;
        return specialization;
    }

    async findByIdWithAddictives(_id: ObjectId) {
        const specialization =
            this.findWithAddictivesCursor<SpecializationAddictive>({
                find: { _id },
                lookups: this.basicLookups,
            }).toArray();
        return specialization[0];
    }

    async editSpecializationWithoutFiles(args: EditSpecialization) {
        const { specializationId: _specializationId } = args;
        const specializationId = new ObjectId(_specializationId);
        delete args['specializationId'];
        const specialization = await this.updateOne({
            find: { _id: specializationId },
            update: args,
            method: '$set',
            ignoreUndefined: true,
        });
        return specialization;
    }

    async editWithFile(args: {
        image: FileUpload;
        req: string;
        specializationId: string;
    }) {
        const { image, req, specializationId: _specializationId } = args;
        const specializationId = new ObjectId(_specializationId);
        const photoURL = await this.photoUploadService.storeImages(
            image.createReadStream(),
            req,
        );
        const specialization = await this.updateOne({
            find: { _id: specializationId },
            update: {
                photoURL,
            },
            method: '$set',
        });
        return specialization;
    }

    async attachManyToDoctor(args: {
        specializationIds: ObjectId[];
        doctorId: ObjectId;
    }) {
        const { specializationIds, doctorId } = args;
        await this.dbService.updateMany(
            { _id: { $in: specializationIds } },
            {
                $addToSet: doctorId,
            },
        );
    }
}
