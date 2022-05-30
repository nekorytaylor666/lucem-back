import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { BasicService } from 'src/modules/helpers/basic.service';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Session } from 'src/modules/session/model/session.interface';
import { AppointmentBlank } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentResults } from '../model/parts/AppointmenResults.model';
import { Inspections } from '../model/parts/inspections.model';

@Injectable()
export class AppointmentBlankService extends BasicService<AppointmentBlank> {
    public appointmentBlankCollection = 'appointmentBlank';
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private imageService: ImageUploadService,
        private doctorService: DoctorService,
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
            doctorId: ObjectId;
        },
    ) {
        const {
            inspections: _inspections,
            diagnose,
            complaint,
            req,
            session,
            doctorId,
        } = args;
        const inspections: Inspections[] =
            _inspections.data &&
            (await Promise.all(
                _inspections.data.map(async (inspection) => {
                    return {
                        _id: new ObjectId(),
                        doctorId,
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
            diagnose: {
                ...diagnose,
                doctorId,
            },
            inspections,
            complaint: {
                ...complaint,
                doctorId,
            },
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
            doctorId,
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

    async getAddictive(args: Partial<AppointmentBlank>) {
        const appointmentBlank = await this.findOne(args);
        const [
            complaintDoctor,
            diagnoseDoctor,
            inspectionsDoctors,
            appointmentResultsDoctors,
        ] = await Promise.all([
            appointmentBlank.complaint.doctorId &&
                (await this.doctorService.findOne({
                    _id: appointmentBlank.complaint.doctorId,
                })),
            appointmentBlank.diagnose.doctorId &&
                (await this.doctorService.findOne({
                    _id: appointmentBlank.diagnose.doctorId,
                })),
            await Promise.all(
                appointmentBlank.inspections.map(async (val) => {
                    return await this.doctorService.findOne({
                        _id: val.doctorId,
                    });
                }),
            ),
            await Promise.all(
                appointmentBlank.appointmentResults.map(async (val) => {
                    return await this.doctorService.findOne({
                        _id: val.doctorId,
                    });
                }),
            ),
        ]);
        (appointmentBlank.complaint as any).doctor = complaintDoctor;
        (appointmentBlank.diagnose as any).doctor = diagnoseDoctor;
        appointmentBlank.inspections.forEach((inspection) => {
            const doctor = inspectionsDoctors.find(
                (val) =>
                    val._id.toHexString() === inspection.doctorId.toHexString(),
            );
            (inspection as any).doctor = doctor;
        });
        appointmentBlank.appointmentResults.forEach((appResult) => {
            const doctor = appointmentResultsDoctors.find(
                (val) =>
                    val._id.toHexString() === appResult.doctorId.toHexString(),
            );
            (appResult as any).doctor = doctor;
        });
        return appointmentBlank;
    }

    async getMultipleWithAddictives(
        args: { doctorId: ObjectId; userId: ObjectId },
        page: number,
    ) {
        const { doctorId, userId } = args;
        const appointmentBlanks = await this.dbService
            .find({
                userId,
                owners: { $elemMatch: { doctorId: { $eq: doctorId } } },
            })
            .skip(15 * (page - 1))
            .limit(15 * (page + 1))
            .toArray();
        await Promise.all([
            appointmentBlanks.forEach(async (appointmentBlank) => {
                const [
                    complaintDoctor,
                    diagnoseDoctor,
                    inspectionsDoctors,
                    appointmentResultsDoctors,
                ] = await Promise.all([
                    appointmentBlank.complaint.doctorId &&
                        (await this.doctorService.findOne({
                            _id: appointmentBlank.complaint.doctorId,
                        })),
                    appointmentBlank.diagnose.doctorId &&
                        (await this.doctorService.findOne({
                            _id: appointmentBlank.diagnose.doctorId,
                        })),
                    await Promise.all(
                        appointmentBlank.inspections.map(async (val) => {
                            return await this.doctorService.findOne({
                                _id: val.doctorId,
                            });
                        }),
                    ),
                    await Promise.all(
                        appointmentBlank.appointmentResults.map(async (val) => {
                            return await this.doctorService.findOne({
                                _id: val.doctorId,
                            });
                        }),
                    ),
                ]);
                (appointmentBlank.complaint as any).doctor = complaintDoctor;
                (appointmentBlank.diagnose as any).doctor = diagnoseDoctor;
                appointmentBlank.inspections.forEach((inspection) => {
                    const doctor = inspectionsDoctors.find(
                        (val) =>
                            val._id.toHexString() ===
                            inspection.doctorId.toHexString(),
                    );
                    (inspection as any).doctor = doctor;
                });
                appointmentBlank.appointmentResults.forEach((appResult) => {
                    const doctor = appointmentResultsDoctors.find(
                        (val) =>
                            val._id.toHexString() ===
                            appResult.doctorId.toHexString(),
                    );
                    (appResult as any).doctor = doctor;
                });
            }),
        ]);
        return appointmentBlanks;
    }
}
