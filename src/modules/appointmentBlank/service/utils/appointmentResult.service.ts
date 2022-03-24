import { Inject, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { AppointmentResults } from '../../model/parts/AppointmenResults.model';

@Injectable()
export class AppointmenResultsService extends BasicService<AppointmentResults> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private sessionService: SessionService,
    ) {
        super();
        this.dbService = this.database.collection('appointmentResults');
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
            // {
            //     from: 'session',
            //     // localField: 'sessionId',
            //     foreignField: '_id',
            //     as: 'session',
            //     isArray: false,
            // },
        ];
    }

    async create(args: {
        image?: FileUpload;
        description?: string;
        req?: string;
        doctorId: ObjectId;
        userId: ObjectId;
    }) {
        const { image, description, req, doctorId, userId } = args;
        const appointmentResultPhotoURL =
            image &&
            (await this.imageService.storeImages(
                (await image).createReadStream(),
                req,
            ));
        const appointmentResults: AppointmentResults = {
            _id: new ObjectId(),
            description,
            doctorId,
            userId: userId,
            photoURL: appointmentResultPhotoURL,
        };
        await this.insertOne(appointmentResults);
        return appointmentResults;
    }

    async edit(args: {
        image?: Promise<FileUpload>;
        description?: string;
        req?: string;
        doctorId: ObjectId;
        appointmentResultId: ObjectId;
    }) {
        const {
            image: _image,
            description,
            req,
            doctorId,
            appointmentResultId,
        } = args;
        const resultsWithImage =
            _image &&
            (await this.findOneWithOptions({
                fields: ['_id', 'photoURL'],
                values: [appointmentResultId, { $exists: true }],
            }));
        const image =
            _image && resultsWithImage
                ? await this.imageService.updateImage({
                      stream: (await _image).createReadStream(),
                      req,
                      oldUrls: [
                          resultsWithImage.photoURL.xl,
                          resultsWithImage.photoURL.m,
                          resultsWithImage.photoURL.thumbnail,
                      ],
                  })
                : _image && !resultsWithImage
                ? await this.imageService.storeImages(
                      (await _image).createReadStream(),
                      req,
                  )
                : undefined;
        const appointmentResults: Partial<AppointmentResults> = {
            description,
            photoURL: image && image,
        };
        removeUndefinedFromObject(appointmentResults);
        const results = await this.updateOne({
            find: { doctorId, _id: appointmentResultId },
            update: appointmentResults,
            method: '$set',
        });
        return results;
    }
}
