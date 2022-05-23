import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { Db, ObjectId } from 'mongodb';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { SessionAddictive } from 'src/modules/session/model/session.addictive';
import { SessionService } from 'src/modules/session/service/session.service';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentResults } from '../model/parts/AppointmenResults.model';
import { Complaint } from '../model/parts/complaint.model';
import { Diagnose } from '../model/parts/diagnose.model';
import { Inspections } from '../model/parts/inspections.model';
import { AppointmenResultsService } from './utils/appointmentResult.service';
import { ComplaintService } from './utils/complaint.service';
import { DiagnoseService } from './utils/diagnose.service';
import { InspectionsService } from './utils/inspections.service';

@Injectable()
export class AppointmentBlankService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private sessionService: SessionService,
        private inpectionsService: InspectionsService,
        private diagnoseService: DiagnoseService,
        private appointmentResultsService: AppointmenResultsService,
        private complaintService: ComplaintService,
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

    async create(
        args: CreateAppointmentBlank & { doctorId: ObjectId; req: string },
    ) {
        const {
            sessionId: _sessionId,
            complaints,
            diagnose: _diagnose,
            doctorId,
            inspections: _inspections,
            appointmentResults: _appointmentResults,
            req,
        } = args;
        const sessionId = new ObjectId(_sessionId);
        const session = await this.sessionService
            .findWithAddictivesCursor<SessionAddictive>({
                matchQuery: {
                    _id: new ObjectId(sessionId),
                    data: {
                        $elemMatch: {
                            doctorId: {
                                $eq: doctorId,
                            },
                        },
                    },
                },
                lookups: this.sessionService.basicLookups,
            })
            .toArray();
        if (!session) throw new ApolloError('not your session');
        const complaint: Complaint = complaints && {
            ...complaints,
            _id: new ObjectId(),
            doctorId,
            userId: session[0].user._id,
            sessionId: session[0]._id,
        };
        complaint && removeUndefinedFromObject(complaint);
        complaint && (await this.complaintCollection.insertOne(complaint));
        const diagnose: Diagnose = _diagnose && {
            ..._diagnose,
            _id: new ObjectId(),
            doctorId,
            userId: session[0].user._id,
            sessionId: session[0]._id,
        };
        diagnose && removeUndefinedFromObject(diagnose);
        diagnose && (await this.diagnodeCollection.insertOne(diagnose));
        const inspections: Inspections = _inspections && {
            _id: new ObjectId(),
            doctorId,
            descriptions:
                _inspections.descriptions && _inspections.descriptions,
            images:
                _inspections.images &&
                (await Promise.all(
                    (
                        await _inspections.images
                    ).map(async (val) => {
                        return await this.imageService.storeImages(
                            (await val).createReadStream(),
                            req,
                        );
                    }),
                )),
            userId: session[0].user._id,
            sessionId: session[0]._id,
        };
        inspections && removeUndefinedFromObject(inspections);
        inspections &&
            (await this.inspectionsCollection.insertOne(inspections));
        const appointmentResult: AppointmentResults = _appointmentResults && {
            ..._appointmentResults,
            _id: new ObjectId(),
            userId: session[0].user._id,
            sessionId: session[0]._id,
            doctorId,
            photoURL:
                _appointmentResults.photoURL &&
                (await this.imageService.storeImages(
                    (await _appointmentResults.photoURL).createReadStream(),
                    req,
                )),
        };
        appointmentResult && removeUndefinedFromObject(appointmentResult);
        appointmentResult &&
            (await this.appointmentResultsCollection.insertOne(
                appointmentResult,
            ));
        const appointmentBlank = {
            complaint,
            diagnose,
            inspections,
            appointmentResult,
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

    async edit(
        args: EditAppointmentBlank & { doctorId: ObjectId; req: string },
    ): Promise<
        [
            inspections: Inspections,
            diagnose: Diagnose,
            appointmentResults: AppointmentResults,
            complaint: Complaint,
        ]
    > {
        const {
            inspections: _inspections,
            sessionId: _sessionId,
            doctorId,
            diagnose: _diagnose,
            appointmentResults: _appointmentResults,
            complaints: _complaints,
            req,
        } = args;
        const sessionId = new ObjectId(_sessionId);
        const inspections =
            _inspections &&
            (await this.inpectionsService.edit({
                ..._inspections,
                sessionId,
                doctorId,
                req,
            }));
        const diagnose =
            _diagnose &&
            (await this.diagnoseService.edit({
                ..._diagnose,
                sessionId,
                doctorId,
            }));
        const appointmentResults =
            _appointmentResults &&
            (await this.appointmentResultsService.edit({
                ..._appointmentResults,
                image: _appointmentResults.photo,
                sessionId,
                doctorId,
            }));
        const complaints =
            _complaints &&
            (await this.complaintService.edit({
                ..._complaints,
                sessionId,
                doctorId,
            }));
        return [inspections, diagnose, appointmentResults, complaints];
    }
}
