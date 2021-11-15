import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateDoctor } from '../model/createDoctor.args';
import * as bcrypt from 'bcryptjs';
import { Doctor } from '../model/doctor.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { DeseaseService } from 'src/modules/deseases/service/desease.service';
import { DoctorAddictives } from '../model/doctor.addictives';
import { ApolloError } from 'apollo-server-express';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';
import { Modify } from 'src/utils/modifyType';
import { ExperienceAndEducation } from '../model/parts/experience.model';
import { FileUpload } from 'graphql-upload';
import { BasicService } from 'src/modules/helpers/basic.service';

@Injectable()
export class DoctorService extends BasicService<Doctor> {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
        private deseaseService: DeseaseService,
        @Inject('SMARTSEARCH_CONNECTION') private client,
        private fileUploadService: ImageUploadService,
    ) {
        super();
        this.dbService = this.database.collection('doctor');
    }

    private get experienceCollection() {
        return this.database.collection('experience');
    }

    private get searchCollection() {
        return this.client.collections('doctor').documents();
    }

    async createDoctor(
        args: CreateDoctor,
        req: string,
    ): Promise<Doctor & DoctorAddictives> {
        const {
            fullName,
            email,
            phoneNumber: _phoneNumber,
            password,
            deseasesIDs,
            yearsOfExperience,
            description,
            acceptableAgeGroup,
            avatar,
            experience,
        } = args;
        const avatarURL = await this.fileUploadService.storeImages(
            (await avatar).createReadStream(),
            req,
        );
        const passwordHASH = await bcrypt.hash(password, 12);
        const phoneNumber = _phoneNumber.replace(/\D/g, '');
        const deseases =
            deseasesIDs &&
            (await Promise.all(
                deseasesIDs.map(async (id) => {
                    const desease = await this.deseaseService.findOne({
                        _id: new ObjectId(id),
                    });
                    return desease;
                }),
            ));
        const doctor: Doctor & DoctorAddictives = {
            fullName,
            email,
            passwordHASH,
            phoneNumber,
            yearsOfExperience,
            description,
            acceptableAgeGroup,
            avatar: avatarURL,
        };

        const insertDoctor = await this.insertOne(doctor);
        const searchDoctor: Modify<Doctor, { _id: string }> = {
            ...doctor,
            _id: doctor._id.toHexString(),
        };
        await this.searchCollection.create(searchDoctor);
        const token = this.tokenService.create({
            user: {
                _id: insertDoctor.toHexString(),
                email,
                phoneNumber,
                fullName,
            },
            role: TokenRoles.Doctor,
        });
        [doctor._id, doctor.token, doctor.deseases] = [
            insertDoctor,
            token,
            deseases,
        ];
        const experiences: ExperienceAndEducation[] = experience.map((val) => {
            return {
                _id: new ObjectId(),
                doctorId: doctor._id,
                data: val.data,
                name: val.name,
            };
        });
        await this.experienceCollection.insertMany(experiences);
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
        const token = await this.tokenService.create({
            user: {
                ...doctor,
                _id: doctor._id.toHexString(),
            },
            role: TokenRoles.Doctor,
        });
        doctor.token = token;
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

    async findOneWithAddictives(args: Partial<Doctor>) {
        const doctors = await this.dbService
            .aggregate<DoctorAddictives>([
                {
                    $match: args,
                },
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
                        from: 'experience',
                        localField: '_id',
                        foreignField: 'doctorId',
                        as: 'experiences',
                    },
                },
            ])
            .toArray();
        return doctors[0];
    }

    async listWithAddictives() {
        const doctors = await this.dbService
            .aggregate<DoctorAddictives>([
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
                        from: 'experience',
                        localField: '_id',
                        foreignField: 'doctorId',
                        as: 'experiences',
                    },
                },
                {
                    $lookup: {
                        from: 'timeline',
                        let: {
                            id: '$_id',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$doctorId', '$$id'] },
                                            {
                                                $gt: [new Date(), '$endTime'],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'timelines',
                    },
                },
            ])
            .toArray();
        return doctors;
    }
}
