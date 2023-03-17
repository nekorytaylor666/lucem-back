import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateDoctor } from '../model/createDoctor.args';
import * as bcrypt from 'bcryptjs';
import { Doctor } from '../model/doctor.interface';
import { DeseaseService } from 'src/modules/deseases/service/desease.service';
import { ApolloError } from 'apollo-server-express';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Modify } from 'src/utils/modifyType';
import { FileUpload } from 'graphql-upload';
import { BasicService } from 'src/modules/helpers/basic.service';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { ExperienceAndEducation } from '../model/utils/experience/experience.model';
import { WorkTime } from '../model/utils/workTime/workTime.model';
import { parseTime } from 'src/utils/parseTime';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { EditDoctor } from '../model/editDoctor.args';
import { BookingProgress } from 'src/modules/booking/model/booking.interface';
import { ServiceService } from 'src/modules/service/service/service.service';
import { Service } from 'src/modules/service/model/service.interface';

@Injectable()
export class DoctorService extends BasicService<Doctor> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private client,
        private fileUploadService: ImageUploadService,
        private serviceService: ServiceService,
    ) {
        super();
        this.dbService = this.database.collection('doctor');
        this.basicLookups = [
            {
                from: 'specialization',
                let: {
                    id: '_id',
                },
                pipeline: [
                    {
                        $addFields: {
                            doctorIds: {
                                $ifNull: ['$doctorIds', ['null']],
                            },
                        },
                    },
                    {
                        $match: {
                            $expr: {
                                $in: ['$$id', '$doctorIds'],
                            },
                        },
                    },
                ],
                as: 'specializations',
                isArray: true,
            },
            {
                from: 'booking',
                let: {
                    id: '_id',
                },
                pipeline: [
                    {
                        $match: {
                            startDate: {
                                $gte: new Date(),
                            },
                            $expr: {
                                $eq: ['$$id', '$doctorId'],
                            },
                        },
                    },
                ],
                as: 'upcomingBookings',
                isArray: true,
            },
        ];
    }

    private get searchCollection() {
        return this.client.collections('doctor').documents();
    }

    async createDoctor(args: CreateDoctor, req: string): Promise<Doctor> {
        const {
            fullName,
            email,
            phoneNumber: _phoneNumber,
            password,
            startingExperienceDate,
            description,
            acceptableAgeGroup,
            avatar,
            experience,
            languages,
            workTimes: _workTimes,
            cabinet,
        } = args;
        const avatarURL =
            avatar &&
            (await this.fileUploadService.storeImages(
                (await avatar).createReadStream(),
                req,
            ));
        const passwordHASH = await bcrypt.hash(password, 12);
        const phoneNumber = _phoneNumber.replace(/\D/g, '');
        const experiences: ExperienceAndEducation[] = experience.map((val) => {
            return {
                _id: new ObjectId(),
                data: val.data,
                name: val.name,
            };
        });
        const workTimes: WorkTime[] = _workTimes.map((val) => {
            return {
                startTime: parseTime(val.startTime),
                endTime: parseTime(val.endTime),
            };
        });
        const doctor: Omit<Doctor, '_id'> = {
            fullName,
            email,
            passwordHASH,
            phoneNumber,
            startingExperienceDate,
            description,
            acceptableAgeGroup,
            avatar: avatarURL,
            experiences,
            languages,
            workTimes,
            cabinet,
        };
        const insertDoctorResponse = await this.dbService.insertOne(doctor);
        const insertDoctorId = insertDoctorResponse.insertedId;

        const insertDoctor = await this.findOneWithOptions({
            fields: ['_id'],
            values: [insertDoctorId],
        });
        const searchDoctor: Modify<Doctor, { _id: string; num: number }> = {
            ...doctor,
            _id: insertDoctor._id.toHexString(),
            num: 12,
        };
        await this.searchCollection.create(searchDoctor);
        return insertDoctor;
    }

    async login(args: { email: string; password: string }) {
        const { email, password } = args;
        const doctor = await this.findOneWithOptions({
            fields: ['email', 'isDeleted'],
            values: [email, { $exists: false }],
        });
        const checkPassword = await bcrypt.compare(
            password,
            doctor.passwordHASH,
        );
        if (!checkPassword) throw new ApolloError('password or email is wrong');
        return doctor;
    }

    async editWithFile(args: {
        image: FileUpload;
        doctorId: string;
        req: string;
    }) {
        const { image, doctorId: _doctorId, req } = args;
        const doctorId = new ObjectId(_doctorId);
        const photoURL = await this.fileUploadService.storeImages(
            image.createReadStream(),
            req,
        );
        const doctor = await this.updateOne({
            find: { _id: doctorId },
            update: { avatar: photoURL },
            method: '$set',
        });
        return doctor;
    }

    async edit(args: EditDoctor & { req: string }): Promise<Doctor> {
        const {
            avatar,
            req,
            workTimes,
            doctorId: _doctorId,
            fullName,
            email,
            password,
            description,
            experiences,
            languages,
            startingExperienceDate,
            cabinet,
            defaultServiceId,
            acceptableAgeGroup,
        } = args;
        const doctorId = new ObjectId(_doctorId);
        const passwordHASH = password && (await bcrypt.hash(password, 12));
        const avatarURL =
            avatar &&
            (await this.fileUploadService.storeImages(
                (await avatar).createReadStream(),
                req,
            ));
        const service = await this.serviceService.findOne({
            _id: new ObjectId(defaultServiceId),
        });
        console.log(workTimes);
        if (workTimes) {
            const workTime = workTimes.map((val) => {
                return {
                    startTime: parseTime(val.startTime),
                    endTime: parseTime(val.endTime),
                    isActive: val.isActive,
                } as WorkTime;
            });
            await this.dbService.updateOne(
                { _id: doctorId },
                {
                    $set: {
                        workTimes: workTime,
                    },
                },
            );
        }
        const doctor: Partial<Doctor & { defaultService: Service }> = {
            fullName,
            email,
            passwordHASH,
            languages,
            description,
            defaultService: service,
            startingExperienceDate,
            cabinet,
            experiences,
            acceptableAgeGroup,
            avatar: avatarURL && avatarURL,
        };
        removeUndefinedFromObject(doctor);
        const updatedDoctor = doctor
            ? await this.updateOne({
                  find: { _id: doctorId },
                  update: doctor,
                  method: '$set',
                  ignoreUndefined: true,
              })
            : await this.findOne({ _id: doctorId });
        return updatedDoctor;
    }

    async findByIdWithAddictives(_id: ObjectId) {
        const doctor = await this.findWithAddictivesCursor<
            Doctor & {
                specializations?: Specialization[];
            }
        >({
            find: { _id },
            lookups: this.basicLookups,
        }).toArray();
        return doctor[0];
    }

    async listWithAddictives() {
        const doctors = await this.dbService
            .aggregate<
                Doctor & {
                    specializations?: Specialization[];
                }
            >([
                {
                    $lookup: {
                        from: 'specialization',
                        let: {
                            id: '$_id',
                        },
                        pipeline: [
                            {
                                $addFields: {
                                    doctorIds: {
                                        $ifNull: ['$doctorIds', ['null']],
                                    },
                                },
                            },
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$$id', '$doctorIds'],
                                    },
                                },
                            },
                        ],
                        as: 'specializations',
                    },
                },
                {
                    $lookup: {
                        from: 'booking',
                        let: {
                            id: '$_id',
                        },
                        pipeline: [
                            {
                                $match: {
                                    startDate: {
                                        $gt: new Date(),
                                    },
                                    $or: [
                                        {
                                            progress: {
                                                $eq: BookingProgress.Ongoing,
                                            },
                                        },
                                        {
                                            progress: {
                                                $eq: BookingProgress.Upcoming,
                                            },
                                        },
                                    ],
                                    $expr: {
                                        $eq: ['$doctorId', '$$id'],
                                    },
                                },
                            },
                        ],
                        as: 'upcomingBookings',
                    },
                },
            ])
            .toArray();
        return doctors;
    }
}
