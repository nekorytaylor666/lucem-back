import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import * as excel from 'exceljs';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import {
    AcceptableAgeGroup,
    Doctor,
} from 'src/modules/doctor/model/doctor.interface';
import * as bcrypt from 'bcryptjs';
import { ExperienceAndEducation } from 'src/modules/doctor/model/parts/experience.model';
import { AllowedExperienceAndEducationTypes } from 'src/modules/doctor/model/parts/experience.enum';
import { Service } from 'src/modules/service/model/service.interface';

@Injectable()
export class ScriptService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        @Inject('SMARTSEARCH_CONNECTION') private client,
    ) {}

    private get specializationCollection() {
        return this.database.collection<Specialization>('specialization');
    }

    private get experienceAndEducationCollection() {
        return this.database.collection('experience');
    }

    private get doctorCollection() {
        return this.database.collection('doctor');
    }

    private get doctorSearchCollection() {
        return this.client.collections('doctor').documents();
    }

    private get serviceCollection() {
        return this.database.collection('service');
    }

    async addDoctorsToDatabase(doctorSheet: excel.Worksheet) {
        for (let i = 2; i < 20; i++) {
            const [
                name,
                surname,
                otchestvo,
                _specializations,
                adultOrChild,
                _yearsOfExperience,
                hobby,
                _experienceFlex,
            ] = [
                doctorSheet.getRow(i).getCell(2).value,
                doctorSheet.getRow(i).getCell(3).value,
                doctorSheet.getRow(i).getCell(4).value,
                doctorSheet.getRow(i).getCell(6).value,
                doctorSheet.getRow(i).getCell(7).value as string,
                doctorSheet.getRow(i).getCell(10).value as
                    | number
                    | { result: number },
                doctorSheet.getRow(i).getCell(15).value as string,
                doctorSheet.getRow(i).getCell(13).value as string,
            ];
            const yearsOfExperience =
                typeof _yearsOfExperience === 'number'
                    ? _yearsOfExperience
                    : _yearsOfExperience
                    ? _yearsOfExperience.result
                    : null;
            // ADDING DOCTORS TO DATABASE
            const passwordHASH = await bcrypt.hash('1234', 12);
            const doctor: Doctor = {
                _id: new ObjectId(),
                fullName: `${name} ${surname} ${otchestvo}`,
                acceptableAgeGroup:
                    adultOrChild === 'Принимает и детей, и взрослых'
                        ? AcceptableAgeGroup.Both
                        : adultOrChild === 'Принимает только взрослых'
                        ? AcceptableAgeGroup.Adult
                        : adultOrChild
                        ? AcceptableAgeGroup.Child
                        : undefined,
                yearsOfExperience:
                    yearsOfExperience && (yearsOfExperience as number),
                passwordHASH,
                email: `${name}@gmail.com`,
                phoneNumber: '77756453524',
                description: hobby && hobby.replace('\n', ''),
            };
            await this.doctorCollection.insertOne(doctor);
            try {
                await this.doctorSearchCollection.create(doctor);
            } catch (e) {}
            // ==========================

            const experienceFlex =
                _experienceFlex && _experienceFlex.split('\n');
            // EXPERIENCE ADD TO DATABASE
            const experienceData =
                experienceFlex &&
                experienceFlex.map((val) => {
                    const dateAndDesc = val.split(' - ');
                    const dates = dateAndDesc[0].split(' ');
                    if (!dates[0]) return;
                    const data: {
                        years: [number, number];
                        description: string;
                    } = {
                        years:
                            dates.length > 1
                                ? [parseInt(dates[0]), parseInt(dates[1])]
                                : [parseInt(dates[0]), parseInt(dates[0])],
                        description: dateAndDesc[1],
                    };
                    return data;
                });
            const experience: ExperienceAndEducation = {
                _id: new ObjectId(),
                name: AllowedExperienceAndEducationTypes.Experience,
                data: experienceData,
                doctorId: doctor._id,
            };
            await this.experienceAndEducationCollection.insertOne(experience);
            //=============================

            // SPECIALIZATIONS ADDING TO DB
            if (_specializations) {
                const specializations =
                    _specializations && _specializations.toString().split(', ');
                console.log(specializations);
                specializations &&
                    Promise.all(
                        specializations.map(async (val) => {
                            const specialization: Specialization = {
                                _id: new ObjectId(),
                                description: 'это блять специализация',
                                name: val,
                                doctorIds: [doctor._id],
                            };
                            const checkIfExists =
                                await this.specializationCollection.findOne<Specialization>(
                                    {
                                        name: val,
                                    },
                                );
                            if (!checkIfExists) {
                                await this.specializationCollection.insertOne(
                                    specialization,
                                );
                                return;
                            }
                            await this.specializationCollection.updateOne(
                                { name: val },
                                { $addToSet: { doctorIds: doctor._id } },
                            );
                        }),
                    );
                // =============================
            }
        }
    }

    async addServicesToDatabase(serviceSheet: excel.Worksheet) {
        for (let i = 2; i < 251; i++) {
            const [_specializations, name, isViewed, price, childAllowed] = [
                serviceSheet.getRow(i).getCell(1).value as string,
                serviceSheet.getRow(i).getCell(2).value as string,
                serviceSheet.getRow(i).getCell(3).value as string,
                serviceSheet.getRow(i).getCell(4).value as number | string,
                serviceSheet.getRow(i).getCell(6).value as string,
            ];
            const specializations = _specializations.toString().split(', ');
            const specializationIds = await Promise.all(
                specializations.map(async (val) => {
                    const specialization =
                        await this.specializationCollection.findOne({
                            name: val,
                        });
                    return specialization && specialization._id;
                }),
            );

            const service: Service = {
                _id: new ObjectId(),
                name,
                description: 'this is a service',
                price:
                    typeof price === 'number'
                        ? price
                        : Number(price.replace('от ', '')),
                isShown: isViewed === 'Да' ? undefined : false,
                specializationIds,
            };
            console.log(service);
            await this.serviceCollection.insertOne(service, {
                ignoreUndefined: true,
            });
        }
    }
}
