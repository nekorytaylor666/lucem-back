import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
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

    async create(args: CreateAppointmentBlank & { doctorId: ObjectId }) {
        const {
            sessionId: _sessionId,
            complaints,
            appointmentResults,
            diagnose,
            doctorId,
            inspections,
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
            },
            diagnose,
            userId: session[0].booking.userId,
            doctorId: session[0].booking.doctor._id,
            inspections,
        };
        const insertBlank = await this.appointmentBlankCollection.insertOne(
            appointmentBlank,
        );
        appointmentBlank._id = insertBlank.insertedId;
        return appointmentBlank;
    }

    async addFileToAppointmentResult(args: {
        file: FileUpload;
        req: string;
        appointmentBlankId: ObjectId;
        doctorId: ObjectId;
    }) {
        const { file, req, appointmentBlankId, doctorId } = args;
        const photoURL = await this.imageService.storeImages(
            file.createReadStream(),
            req,
        );
        const updateAppointmentBlank =
            await this.appointmentBlankCollection.findOneAndUpdate(
                <AppointmentBlank>{ _id: appointmentBlankId, doctorId },
                { $set: { 'appointmentResults.photoURL': photoURL } },
                { returnDocument: 'after' },
            );
        if (!updateAppointmentBlank.value)
            throw new ApolloError('this is not your appointment blank');
        return updateAppointmentBlank.value;
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
