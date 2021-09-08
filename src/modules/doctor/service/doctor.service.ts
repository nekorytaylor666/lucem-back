import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateDoctor } from '../model/createDoctor.args';
import * as bcrypt from 'bcryptjs';
import { Doctor } from '../model/doctor.interface';
import { TokenService } from 'src/modules/helpers/token/token.service';
import { TokenRoles } from 'src/modules/helpers/token/token.interface';
import { DeseaseService } from 'src/modules/deseases/service/desease.service';
import { DoctorAddictives } from '../model/doctor.addictives';
import { DoctorDeseaseService } from 'src/modules/doctorDesease/service/doctorDesease.service';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class DoctorService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private tokenService: TokenService,
        private deseaseService: DeseaseService,
        private doctorDeseaseService: DoctorDeseaseService,
    ) {}

    private get doctorCollection() {
        return this.database.collection<Doctor>('doctor');
    }

    async createDoctor(args: CreateDoctor): Promise<Doctor & DoctorAddictives> {
        const {
            fullName,
            email,
            phoneNumber: _phoneNumber,
            password,
            dateOfBirth: _dateOfBirth,
            deseasesIDs,
            yearsOfExperience
        } = args;
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
            yearsOfExperience
        };
        const insertDoctor = await this.doctorCollection.insertOne(doctor, {
            ignoreUndefined: true,
        });
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
}
