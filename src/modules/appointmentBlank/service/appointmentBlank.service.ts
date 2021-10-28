import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { AppointmentResults } from '../model/parts/AppointmenResults.model';
import { Complaint } from '../model/parts/complaint.model';
import { Diagnose } from '../model/parts/diagnose.model';
import { Inspections } from '../model/parts/inspections.model';

@Injectable()
export class AppointmentBlankService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private sessionService: SessionService,
    ) {}

    private get complaintCollection() {
        return this.database.collection('complaint');
    }

    private get diagnodeCollection() {
        return this.database.collection('diagnose');
    }

    private get appointmentResultsCollection() {
        return this.database.collection('appointmentResults');
    }

    private get inspectionsCollection() {
        return this.database.collection('inspections');
    }

    async create(args: CreateAppointmentBlank & { doctorId: ObjectId }) {
        const {
            sessionId: _sessionId,
            complaints,
            appointmentResults: _appointmentResults,
            diagnose: _diagnose,
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
        const appointmentResults: AppointmentResults = {
            _id: new ObjectId(),
            description: _appointmentResults.description,
            doctorId,
        };
        await this.appointmentResultsCollection.insertOne(appointmentResults);
        const complaint: Complaint = {
            ...complaints,
            _id: new ObjectId(),
            doctorId,
        };
        await this.complaintCollection.insertOne(complaint);
        const diagnose: Diagnose = {
            ..._diagnose,
            _id: new ObjectId(),
            doctorId,
        };
        await this.diagnodeCollection.insertOne(diagnose);
        const inpections: Inspections = {
            _id: new ObjectId(),
            doctorId,
            inspections,
        };
        await this.inspectionsCollection.insertOne(inspections);
        const appointmentBlank = {
            appointmentResults,
            complaint,
            diagnose,
            inpections,
        };
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
            await this.appointmentResultsCollection.findOneAndUpdate(
                <Partial<AppointmentResults>>{
                    _id: appointmentBlankId,
                    doctorId,
                },
                { $set: { photoURL } },
                { returnDocument: 'after' },
            );
        if (!updateAppointmentBlank.value)
            throw new ApolloError('this is not your appointment blank');
        return updateAppointmentBlank.value;
    }
}
