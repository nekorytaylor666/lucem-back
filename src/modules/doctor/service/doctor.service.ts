import { Inject, Injectable } from '@nestjs/common';
import { ConnectionClosedEvent, Db, ObjectId } from 'mongodb';
import { CreateDoctor } from '../model/createDoctor.args';
import * as bcrypt from 'bcryptjs';
import { Doctor } from '../model/doctor.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { DeseaseService } from 'src/modules/deseases/service/desease.service';
import { DoctorAddictives } from '../model/doctor.addictives';
import { DoctorDeseaseService } from 'src/modules/doctorDesease/service/doctorDesease.service';
import { ApolloError } from 'apollo-server-express';
import { DoctorSearch } from '../model/doctor.schema';
import { ImageUploadService } from 'src/modules/helpers/uploadFiles/imageUpload/imageUpload.service';

@Injectable()
export class DoctorService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
        private deseaseService: DeseaseService,
        private doctorDeseaseService: DoctorDeseaseService,
        @Inject('SMARTSEARCH_CONNECTION') private client,
        private fileUploadService: ImageUploadService,
    ) {}

    private get doctorCollection() {
        return this.database.collection<Doctor>('doctor');
    }

    private get searchCollection() {
        return this.client.collections('doctor').documents();
    }

    async list() {
        const doctors = await this.doctorCollection.find().toArray();
        return doctors;
    }

    async createDoctor(args: CreateDoctor, req: string): Promise<Doctor & DoctorAddictives> {
        const {
            fullName,
            email,
            phoneNumber: _phoneNumber,
            password,
            dateOfBirth: _dateOfBirth,
            deseasesIDs,
            yearsOfExperience,
            description,
            acceptableAgeGroup,
            avatar,
        } = args;
        const avatarURL = await this.fileUploadService.storeImages(
            (await avatar).createReadStream(),
            req
        );
        const passwordHASH = await bcrypt.hash(password, 12);
        const dateOfBirth = new Date(_dateOfBirth);
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
            dateOfBirth,
            phoneNumber,
            yearsOfExperience,
            description,
            acceptableAgeGroup,
            avatar: avatarURL
        };
        
        const insertDoctor = await this.doctorCollection.insertOne(doctor, {
            ignoreUndefined: true,
        });
        const searchDoctor: DoctorSearch = {
            ...doctor,
            _id: doctor._id.toHexString(),
        };
        await this.searchCollection.create(searchDoctor);
        if (deseases) {
            deseasesIDs.map(async (val) => {
                this.doctorDeseaseService.create({
                    doctorId: insertDoctor.insertedId.toHexString(),
                    deseaseId: val,
                });
            });
        }
        const token = this.tokenService.create({
            user: {
                _id: insertDoctor.insertedId.toHexString(),
                email,
                phoneNumber,
                dateOfBirth,
                fullName,
            },
            role: TokenRoles.Doctor,
        });
        [doctor._id, doctor.token, doctor.deseases] = [
            insertDoctor.insertedId,
            token,
            deseases,
        ];
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

    async update(args: {
        findField: (keyof Doctor)[];
        findValue: any[];
        updateField: (keyof Doctor)[];
        updateValue: any[];
        method: '$inc' | '$set' | '$addToSet';
    }) {
        const { findField, findValue, updateField, updateValue, method } = args;
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
        await this.doctorCollection.updateOne(findQuery, updateQuery);
    }
}
