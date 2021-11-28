import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { AppointmentResults } from '../../model/parts/AppointmenResults.model';

@Injectable()
export class AppointmenResultsService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private sessionService: SessionService,
    ) {}

    private get appointmentResultsCollection() {
        return this.database.collection('appointmentResults');
    }

    async find(args: Partial<AppointmentResults>) {
        const appointmentResults = await this.appointmentResultsCollection
            .find(args)
            .toArray();
        return appointmentResults;
    }

    async findOne(args: Partial<AppointmentResults>) {
        const appointmentResults =
            await this.appointmentResultsCollection.findOne<AppointmentResults>(
                args,
            );
        return appointmentResults;
    }

    async findWithAddictives(args: Partial<AppointmentResults>) {
        const appointmentResults = await this.appointmentResultsCollection
            .aggregate([
                {
                    $match: args,
                },
                {
                    $lookup: {
                        from: 'doctor',
                        localField: 'doctorId',
                        foreignField: '_id',
                        as: 'doctors',
                    },
                },
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users',
                    },
                },
                {
                    $lookup: {
                        from: 'session',
                        localField: 'sessionId',
                        foreignField: '_id',
                        as: 'sessions',
                    },
                },
                {
                    $addFields: {
                        user: {
                            $arrayElemAt: ['$users', 0],
                        },
                        doctor: {
                            $arrayElemAt: ['$doctors', 0],
                        },
                        session: {
                            $arrayElemAt: ['$sessions', 0],
                        },
                    },
                },
            ])
            .toArray();
        return appointmentResults;
    }

    async create(args: {
        sessionId: ObjectId;
        image?: FileUpload;
        description?: string;
        req: string;
        doctorId: ObjectId;
    }) {
        const { sessionId, image, description, req, doctorId } = args;
        const session = await this.sessionService.findWithAddictives({
            fields: ['_id', 'doctorId'],
            values: [sessionId, doctorId],
        });
        if (!session) throw new ApolloError('not your session');
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
            userId: session[0].booking.user._id,
            sessionId: session[0]._id,
            photoURL: appointmentResultPhotoURL,
        };
        await this.appointmentResultsCollection.insertOne(appointmentResults);
        return appointmentResults;
    }
}
