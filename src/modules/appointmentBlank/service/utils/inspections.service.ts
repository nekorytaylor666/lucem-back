import { Inject, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Inspections } from '../../model/parts/inspections.model';

@Injectable()
export class InspectionsService extends BasicService<Inspections> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
    ) {
        super();
        this.dbService = this.database.collection('inspections');
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
        descriptions: string[];
        images: Promise<FileUpload[]>;
        doctorId: ObjectId;
        sessionId: ObjectId;
        req: string;
    }) {
        const {
            descriptions,
            images: _images,
            doctorId,
            sessionId,
            req,
        } = args;
        const images =
            _images &&
            (await Promise.all(
                (
                    await _images
                ).map(async (val) => {
                    return await this.imageService.storeImages(
                        (await val).createReadStream(),
                        req,
                    );
                }),
            ));
        const inspection = await this.updateOne({
            find: { doctorId, sessionId },
            update: { descriptions, images },
            method: '$set',
            ignoreUndefined: true,
        });
        return inspection;
    }
}
