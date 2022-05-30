import { Inject, Injectable } from '@nestjs/common';
import { Db, Filter, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Session } from 'src/modules/session/model/session.interface';
import { AppointmentBlank } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentResults } from '../model/parts/AppointmenResults.model';

@Injectable()
export class AppointmentBlankService extends BasicService<AppointmentBlank> {
    public appointmentBlankCollection = 'appointmentBlank';
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
    ) {
        super();
        this.dbService = this.database.collection(
            this.appointmentBlankCollection,
        );
    }

    async create(
        args: CreateAppointmentBlank & {
            req: string;
            session: Session;
        },
    ) {
        const {
            inspections: _inspections,
            diagnose,
            complaint,
            req,
            session,
        } = args;
        const inspections =
            _inspections.data &&
            (await Promise.all(
                _inspections.data.map(async (inspection) => {
                    return {
                        _id: new ObjectId(),
                        description: inspection.description,
                        images:
                            inspection.images &&
                            (await Promise.all(
                                (
                                    await inspection.images
                                ).map(
                                    async (image) =>
                                        await this.imageService.storeImages(
                                            (await image).createReadStream(),
                                            req,
                                        ),
                                ),
                            )),
                    };
                }),
            ));
        const appointmentBlank: AppointmentBlank = {
            _id: new ObjectId(),
            diagnose,
            inspections,
            complaint,
            owners: [
                {
                    doctorId: session.doctorId,
                    sessionId: session._id,
                    serviceId: session.serviceId,
                },
            ],
            userId: session.userId,
            dateCreated: new Date(),
        };
        await this.insertOne(appointmentBlank);
        return appointmentBlank;
    }

    async edit(
        args: EditAppointmentBlank & { req: string; doctorId: ObjectId },
    ) {
        const {
            inspections: _inspections,
            complaints,
            diagnose,
            appointmentResults: _appointmentResults,
            req,
            appointmentBlankId,
            doctorId,
        } = args;
        const appointmentResults: AppointmentResults = _appointmentResults && {
            photoURL:
                _appointmentResults.photo &&
                (await this.imageService.storeImages(
                    (await _appointmentResults.photo).createReadStream(),
                    req,
                )),
            description:
                _appointmentResults.description &&
                _appointmentResults.description,
        };
        const inspections =
            _inspections &&
            (await Promise.all(
                _inspections.data.map(async (inspection) => {
                    return {
                        _id: new ObjectId(),
                        description: inspection.description,
                        images: await Promise.all(
                            (
                                await inspection.images
                            ).map(
                                async (image) =>
                                    await this.imageService.storeImages(
                                        (await image).createReadStream(),
                                        req,
                                    ),
                            ),
                        ),
                    };
                }),
            ));
        inspections &&
            (await this.updateOneWithOptions({
                findField: ['_id', 'owners'],
                findValue: [
                    appointmentBlankId,
                    { $elemMatch: { doctorId: { $eq: doctorId } } },
                ],
                updateField: ['inspections'],
                updateValue: [inspections],
                method: '$addToSet',
                ignoreUndefined: true,
            }));
        const appointmentBlank = await this.updateOneWithOptions({
            findField: ['_id', 'owners'],
            findValue: [
                appointmentBlankId,
                { $elemMatch: { doctorId: { $eq: doctorId } } },
            ],
            updateField: ['appointmentResults', 'complaint', 'diagnose'],
            updateValue: [appointmentResults, complaints, diagnose],
            method: '$set',
            ignoreUndefined: true,
        });
        return appointmentBlank;
    }

    async getWithAddictives(args: Filter<AppointmentBlank>) {
        const appointmentBlank = await this.dbService
            .aggregate([
                {
                    $match: args,
                },
                { $unwind: '$owners' },
                {
                    $lookup: {
                        from: 'doctor',
                        localField: 'doctorId',
                        foreignField: '_id',
                        as: 'doctors',
                    },
                },
                {
                    $ifNull: ['$addedByDoctorId', 'null'],
                },
                {
                    $ifNull: ['$sessionId', 'null'],
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
                        from: 'doctor',
                        localField: 'doctorId',
                        foreignField: '_id',
                        as: 'addedByDoctors',
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
                    $lookup: {
                        from: 'service',
                        localField: 'serviceId',
                        foreignField: '_id',
                        as: 'services',
                    },
                },
                {
                    $addFields: {
                        doctor: {
                            $first: '$doctor',
                        },
                        addedByDoctor: {
                            $first: '$addedByDoctors',
                        },
                        session: {
                            $first: '$session',
                        },
                        service: {
                            $first: '$service',
                        },
                    },
                },
            ])
            .toArray();
        console.log(appointmentBlank);
    }
}
