import { Inject, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Modify } from 'src/utils/modifyType';
import { CreateSpecialization } from '../model/createSpecialization.args';
import { EditSpecialization } from '../model/editSpecialization.args';
import { SpecializationAddictive } from '../model/specialization.addictive';
import { Specialization } from '../model/specialization.interface';

@Injectable()
export class SpecializationService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private photoUploadService: ImageUploadService,
    ) {}

    private get specializationCollection() {
        return this.database.collection<Specialization>('specialization');
    }

    async list() {
        return await this.specializationCollection.find().toArray();
    }

    async updateOne(args: {
        find: Partial<Specialization>;
        update: Partial<Modify<Specialization, { doctorIds: ObjectId }>>;
        method: '$addToSet' | '$push' | '$set' | '$inc' | '$pull';
        ignoreUndefined?: true;
    }) {
        const { find, update, method, ignoreUndefined } = args;
        const updateQuery = {
            [method]: update,
        };
        const specialization =
            await this.specializationCollection.findOneAndUpdate(
                find,
                updateQuery,
                {
                    returnDocument: 'after',
                    ignoreUndefined: ignoreUndefined ? ignoreUndefined : false,
                },
            );
        return specialization.value;
    }

    async listWithAddictives() {
        const specializations = await this.specializationCollection
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
                            {
                                $lookup: {
                                    from: 'timeline',
                                    localField: '_id',
                                    foreignField: 'doctorId',
                                    as: 'timelines',
                                },
                            },
                        ],
                        as: 'doctors',
                    },
                },
                {
                    $lookup: {
                        from: 'service',
                        let: {
                            id: '_id',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$$id', '$specializationIds'],
                                    },
                                },
                            },
                        ],
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
        const insertSpecialization =
            await this.specializationCollection.insertOne(specialization);
        specialization._id = insertSpecialization.insertedId;
        return specialization;
    }

    async findOneWithAddictives(_id: string) {
        const id = new ObjectId(_id);
        const specialization = await this.specializationCollection
            .aggregate<SpecializationAddictive>([
                {
                    $match: {
                        _id: id,
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
}
