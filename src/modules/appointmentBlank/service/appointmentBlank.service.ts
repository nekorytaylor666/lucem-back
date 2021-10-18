import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { Modify } from 'src/utils/modifyType';
import { AppointmentBlank } from '../model/appointmentBlank.interface';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';

@Injectable()
export class AppointmentBlankService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private sessionService: SessionService,
    ) {}

    private get appointmentBlankCollection() {
        return this.database.collection('appointmentBlank');
    }

    async create(
        args: CreateAppointmentBlank & { doctorId: ObjectId; reqURL: string },
    ) {
        const {
            sessionId: _sessionId,
            complaints,
            appointmentResults,
            diagnose,
            doctorId,
            reqURL,
        } = args;
        const sessionId = new ObjectId(_sessionId);
        const session = await this.sessionService
            .findWithAddictives({
                fields: ['_id'],
                values: [sessionId],
            })
            .toArray();
        if (
            session[0].booking.doctor._id.toHexString() !=
            doctorId.toHexString()
        )
            throw new ApolloError('this is not your session');
        const appointmentResultsPhotoURL = await this.imageService.storeImages(
            (await appointmentResults.file).createReadStream(),
            reqURL,
        );
        const appointmentBlank: Modify<
            AppointmentBlank,
            {
                _id?: ObjectId;
            }
        > = {
            complaints,
            sessionId: new ObjectId(sessionId),
            appointmentResults: {
                description: appointmentResults.description,
                photoURL: appointmentResultsPhotoURL,
            },
            diagnose,
            userId: session[0].booking.userId,
            doctorId: session[0].booking.doctor._id,
        };
        const insertBlank = await this.appointmentBlankCollection.insertOne(
            appointmentBlank,
        );
        appointmentBlank._id = insertBlank.insertedId;
        return appointmentBlank;
    }

    findWithAddictivesCursor(args: Partial<AppointmentBlank>) {
        const blankCursor = this.appointmentBlankCollection.aggregate([
            { $match: args },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
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
                $lookup: {
                    from: 'session',
                    localField: 'sessionId',
                    foreignField: '_id',
                    as: 'session',
                },
            },
            {
                $project: {
                    _id: 1,
                    complaints: 1,
                    diagnose: 1,
                    appointmentResults: 1,
                    session: {
                        $arrayElemAt: ['$session', 0],
                    },
                    user: {
                        $arrayElemAt: ['$user', 0],
                    },
                    doctor: {
                        $arrayElemAt: ['$doctor', 0],
                    },
                },
            },
        ]);
        return blankCursor;
    }
}
