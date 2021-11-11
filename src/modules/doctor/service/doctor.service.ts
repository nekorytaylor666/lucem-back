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

@Injectable()
export class DoctorService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
        private deseaseService: DeseaseService,
        @Inject('SMARTSEARCH_CONNECTION') private client,
        private fileUploadService: ImageUploadService,
    ) {}

    private get doctorCollection() {
        return this.database.collection<Doctor>('doctor');
    }

    private get experienceCollection() {
        return this.database.collection('experience');
    }

    private get searchCollection() {
        return this.client.collections('doctor').documents();
    }

    async list() {
        const doctors = await this.doctorCollection.find().toArray();
        return doctors;
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

        const insertDoctor = await this.doctorCollection.insertOne(doctor, {
            ignoreUndefined: true,
        });
        const searchDoctor: Modify<Doctor, { _id: string }> = {
            ...doctor,
            _id: doctor._id.toHexString(),
        };
        await this.searchCollection.create(searchDoctor);
        const token = this.tokenService.create({
            user: {
                _id: insertDoctor.insertedId.toHexString(),
                email,
                phoneNumber,
                fullName,
            },
            role: TokenRoles.Doctor,
        });
        [doctor._id, doctor.token, doctor.deseases] = [
            insertDoctor.insertedId,
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

    async updateOne(args: {
        find: Partial<Doctor>;
        update: Partial<Doctor>;
        method: '$inc' | '$set' | '$addToSet' | '$push' | '$pull';
        ignoreundefined?: true;
    }) {
        const { find, update, method, ignoreundefined } = args;
        const updateQuery = {
            [method]: update,
        };
        const doctor = await this.doctorCollection.findOneAndUpdate(
            find,
            updateQuery,
            {
                returnDocument: 'after',
                ignoreUndefined: ignoreundefined ? ignoreundefined : false,
            },
        );
        return doctor;
    }

    async login(args: { email: string; password: string }) {
        const { email, password } = args;
        const doctor = await this.doctorCollection.findOne({ email });
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

    async findOne(args: Partial<Doctor>) {
        const doctor = await this.doctorCollection.findOne(args);
        return doctor;
    }

    async findOneWithAddictives(args: Partial<Doctor>) {
        const doctors = await this.doctorCollection
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

    async updateOneWithOptions(args: {
        findField: (keyof Doctor)[];
        findValue: any[];
        updateField: (keyof Doctor)[];
        updateValue: any[];
        method: '$inc' | '$set' | '$addToSet';
        ignoreundefined?: true;
    }) {
        const {
            findField,
            findValue,
            updateField,
            updateValue,
            method,
            ignoreundefined,
        } = args;
        const findQuery: any = {};
        findField.map((val, ind) => {
            findQuery[val] = findValue[ind];
        });
        const preUpdateQuery: any = {};
        updateField.map((val, ind) => {
            preUpdateQuery[val] = updateValue[ind];
        });
        const updateQuery = {
            [method]: preUpdateQuery,
        };
        const doctor = await this.doctorCollection.findOneAndUpdate(
            findQuery,
            updateQuery,
            {
                returnDocument: 'after',
                ignoreUndefined: ignoreundefined ? ignoreundefined : false,
            },
        );
        return doctor;
    }

    async listWithAddictives() {
        const doctors = await this.doctorCollection
            .aggregate<DoctorAddictives>([
                {
                    $lookup: {
                        from: 'experience',
                        localField: '_id',
                        foreignField: 'doctorId',
                        as: 'experience',
                    },
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
        return doctors;
    }
}
