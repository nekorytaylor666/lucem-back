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

@Injectable()
export class DoctorService extends BasicService<Doctor> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private deseaseService: DeseaseService,
        @Inject('SMARTSEARCH_CONNECTION') private client,
        private fileUploadService: ImageUploadService,
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
        const doctor: Doctor = {
            _id: new ObjectId(),
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
        };
        await this.insertOne(doctor);
        const searchDoctor: Modify<Doctor, { _id: string; num: number }> = {
            ...doctor,
            _id: doctor._id.toHexString(),
            num: 12,
        };
        await this.searchCollection.create(searchDoctor);
        return doctor;
    }

    async login(args: { email: string; password: string }) {
        const { email, password } = args;
        const doctor = await this.findOne({ email });
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
            ])
            .toArray();
        return doctors;
    }
}
