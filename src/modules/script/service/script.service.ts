import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import * as excel from 'exceljs';
import { Specialization } from 'src/modules/specialization/model/specialization.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { ExperienceAndEducation } from 'src/modules/doctor/model/utils/experience/experience.model';
import { AllowedExperienceAndEducationTypes } from 'src/modules/doctor/model/utils/experience/experience.enum';
import {
    AcceptableAgeGroup,
    Doctor,
} from 'src/modules/doctor/model/doctor.interface';
import { Language } from 'src/modules/doctor/model/utils/language/language.model';
import {
    AllowedLanguages,
    AllowedLanguageTypes,
} from 'src/modules/doctor/model/utils/language/language.enum';
import * as moment from 'moment';

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
    // SEPERATORS
    private seperateSpecs(args: { doctorSheet: excel.Worksheet; row: number }) {
        const { doctorSheet, row } = args;
        const _specialiations =
            doctorSheet.getRow(row).getCell(5).value &&
            doctorSheet.getRow(row).getCell(5).value.toString();
        const specialiations = _specialiations && _specialiations.split('||');
        return specialiations;
    }

    private seperateEducation(args: {
        doctorSheet: excel.Worksheet;
        row: number;
    }) {
        const { doctorSheet, row } = args;
        const __educations =
            doctorSheet.getRow(row).getCell(10).value &&
            doctorSheet.getRow(row).getCell(10).value.toString();
        const _educations = __educations && __educations.split('||');
        const educations =
            _educations &&
            _educations.map((val) => {
                const firstYear = parseInt(val.slice(0, 4));
                const secondYear = parseInt(val.slice(7, 11));
                const educationInstitution = val.slice(12);
                const education: {
                    years: [number, number];
                    institutionName: string;
                    specialty: string;
                } = {
                    years: [firstYear, secondYear],
                    institutionName: educationInstitution,
                    specialty: educationInstitution,
                };
                return education;
            });
        const education: ExperienceAndEducation = educations && {
            _id: new ObjectId(),
            name: AllowedExperienceAndEducationTypes.Education,
            data: educations,
        };
        return education;
    }

    private separateQualificationAndWork(args: {
        doctorSheet: excel.Worksheet;
        row: number;
    }) {
        const { doctorSheet, row } = args;
        const __qualifications =
            doctorSheet.getRow(row).getCell(10).value &&
            doctorSheet.getRow(row).getCell(10).value.toString();
        const _qualifications =
            __qualifications && __qualifications.split('||');
        const qualifications =
            _qualifications &&
            _qualifications.map((val) => {
                const firstYear = parseInt(val.slice(0, 4));
                const secondYear = parseInt(val.slice(7, 11));
                const qualificationInstitution = val.slice(12);
                const qualification: {
                    years: [number, number];
                    institutionName: string;
                    specialty: string;
                } = {
                    years: [firstYear, secondYear],
                    institutionName: qualificationInstitution,
                    specialty: qualificationInstitution,
                };
                return qualification;
            });
        const qualification: ExperienceAndEducation = qualifications && {
            _id: new ObjectId(),
            name: AllowedExperienceAndEducationTypes.Experience,
            data: qualifications,
        };

        const __works =
            doctorSheet.getRow(row).getCell(10).value &&
            doctorSheet.getRow(row).getCell(10).value.toString();
        const _works = __works && __works.split('||');
        const works =
            _works &&
            _works.map((val) => {
                const firstYear = parseInt(val.slice(0, 4));
                const secondYear = parseInt(val.slice(7, 11));
                const workInstitution = val.slice(12);
                const work: {
                    years: [number, number];
                    institutionName: string;
                    specialty: string;
                } = {
                    years: [firstYear, secondYear],
                    institutionName: workInstitution,
                    specialty: workInstitution,
                };
                return work;
            });
        const work: ExperienceAndEducation = works && {
            _id: new ObjectId(),
            name: AllowedExperienceAndEducationTypes.Experience,
            data: works,
        };

        return [qualification, work];
    }

    private getAgeGroup(ageGroup: string) {
        if (ageGroup.toLocaleLowerCase() === 'принимает только взрослых')
            return AcceptableAgeGroup.Adult;
        if (ageGroup.toLocaleLowerCase() === 'принимает детей и взрослых')
            return AcceptableAgeGroup.Both;
        if (ageGroup.toLocaleLowerCase() === 'Принимает только детей')
            return AcceptableAgeGroup.Child;
    }

    private separateLanguages(language: string) {
        const __languages = language.split('||');
        const _languages = __languages.map((val) => {
            const _language = val.split(' - ');
            const mainLanguage = _language[0];
            const languageDescription = _language[1];
            const languageObj: Language = {
                language:
                    mainLanguage === 'Русский'
                        ? AllowedLanguages.Russian
                        : mainLanguage === 'Казахский'
                        ? AllowedLanguages.Kazakh
                        : mainLanguage === 'Немецкий'
                        ? AllowedLanguages.German
                        : mainLanguage === 'Турецкий'
                        ? AllowedLanguages.Turkish
                        : AllowedLanguages.English,
                type:
                    languageDescription === 'родной'
                        ? AllowedLanguageTypes.First
                        : languageDescription === 'свободно'
                        ? AllowedLanguageTypes.First
                        : AllowedLanguageTypes.Basic,
            };
            return languageObj;
        });
        return _languages;
    }

    //DATABASERS
    async addSpecToDatabase(doctorSheet: excel.Worksheet) {
        for (let i = 2; i < 40; i++) {
            const specialiationsNames = this.seperateSpecs({
                doctorSheet,
                row: i,
            });
            await Promise.all([
                specialiationsNames &&
                    specialiationsNames.map(async (specialiationsName) => {
                        const specialiation: Specialization = {
                            _id: new ObjectId(),
                            name: specialiationsName,
                            description: specialiationsName,
                        };
                        specialiationsName &&
                            (await this.specializationCollection.updateOne(
                                {
                                    name: specialiationsName,
                                },
                                {
                                    $setOnInsert: specialiation,
                                },
                                {
                                    upsert: true,
                                },
                            ));
                    }),
            ]);
        }
    }

    async addDoctorsToDatabase(doctorSheet: excel.Worksheet) {
        for (let i = 2; i < 40; i++) {
            const [
                name,
                lastName,
                otchestvo,
                _ageGroup,
                experienceYears,
                _qualification,
                _work,
                _languages,
                hobby,
            ] = [
                doctorSheet.getRow(i).getCell(2).value,
                doctorSheet.getRow(i).getCell(3).value,
                doctorSheet.getRow(i).getCell(4).value,
                doctorSheet.getRow(i).getCell(6).value,
                doctorSheet.getRow(i).getCell(9).value,
                doctorSheet.getRow(i).getCell(11).value,
                doctorSheet.getRow(i).getCell(12).value,
                doctorSheet.getRow(i).getCell(13).value,
                doctorSheet.getRow(i).getCell(14).value,
            ];
            const specialiations = this.seperateSpecs({ doctorSheet, row: i });
            const education = this.seperateEducation({ doctorSheet, row: i });
            const qualification = this.separateQualificationAndWork({
                doctorSheet,
                row: i,
            });
            const languages =
                _languages && this.separateLanguages(_languages.toString());
            const ageGroup =
                _ageGroup && this.getAgeGroup(_ageGroup.toString());
            const startingExperienceDate =
                experienceYears &&
                moment(new Date())
                    .subtract(
                        parseInt(experienceYears.toLocaleString()),
                        'years',
                    )
                    .toDate();
            const experiences =
                education && qualification
                    ? [education, ...qualification]
                    : !education && qualification
                    ? [...qualification]
                    : [education];
            const doctor: Doctor = {
                _id: new ObjectId(),
                fullName: `${name} ${otchestvo} ${lastName}`,
                email: `${name}.${otchestvo}.${lastName}@gmail.com`,
                phoneNumber: '',
                passwordHASH: '123456',
                description: hobby ? hobby.toString() : 'description',
                acceptableAgeGroup: ageGroup,
                languages,
                startingExperienceDate,
                experiences,
            };
            specialiations &&
                specialiations.map((val) => {
                    this.specializationCollection.updateOne(
                        { name: val },
                        {
                            $addToSet: {
                                doctorIds: doctor._id,
                            },
                        },
                    );
                });
            console.log(doctor);
            this.doctorCollection.insertOne(doctor);
        }
    }

    // async addDoctorsToDatabase(doctorSheet: excel.Worksheet) {
    //     for (let i = 2; i < 20; i++) {
    //         const [
    //             name,
    //             surname,
    //             otchestvo,
    //             _specializations,
    //             adultOrChild,
    //             _yearsOfExperience,
    //             hobby,
    //             _experienceFlex,
    //         ] = [
    //             doctorSheet.getRow(i).getCell(2).value,
    //             doctorSheet.getRow(i).getCell(3).value,
    //             doctorSheet.getRow(i).getCell(4).value,
    //             doctorSheet.getRow(i).getCell(6).value,
    //             doctorSheet.getRow(i).getCell(7).value as string,
    //             doctorSheet.getRow(i).getCell(10).value as
    //                 | number
    //                 | { result: number },
    //             doctorSheet.getRow(i).getCell(15).value as string,
    //             doctorSheet.getRow(i).getCell(13).value as string,
    //         ];
    //         const yearsOfExperience =
    //             typeof _yearsOfExperience === 'number'
    //                 ? _yearsOfExperience
    //                 : _yearsOfExperience
    //                 ? _yearsOfExperience.result
    //                 : null;
    //         // ADDING DOCTORS TO DATABASE
    //         const passwordHASH = await bcrypt.hash('1234', 12);
    //         const doctor: Doctor = {
    //             _id: new ObjectId(),
    //             fullName: `${name} ${surname} ${otchestvo}`,
    //             acceptableAgeGroup:
    //                 adultOrChild === 'Принимает и детей, и взрослых'
    //                     ? AcceptableAgeGroup.Both
    //                     : adultOrChild === 'Принимает только взрослых'
    //                     ? AcceptableAgeGroup.Adult
    //                     : adultOrChild
    //                     ? AcceptableAgeGroup.Child
    //                     : undefined,
    //             yearsOfExperience:
    //                 yearsOfExperience && (yearsOfExperience as number),
    //             passwordHASH,
    //             email: `${name}@gmail.com`,
    //             phoneNumber: '77756453524',
    //             description: hobby && hobby.replace('\n', ''),
    //         };
    //         await this.doctorCollection.insertOne(doctor);
    //         try {
    //             await this.doctorSearchCollection.create(doctor);
    //         } catch (e) {}
    //         // ==========================

    //         const experienceFlex =
    //             _experienceFlex && _experienceFlex.split('\n');
    //         // EXPERIENCE ADD TO DATABASE
    //         const experienceData =
    //             experienceFlex &&
    //             experienceFlex.map((val) => {
    //                 const dateAndDesc = val.split(' - ');
    //                 const dates = dateAndDesc[0].split(' ');
    //                 if (!dates[0]) return;
    //                 const data: {
    //                     years: [number, number];
    //                     description: string;
    //                 } = {
    //                     years:
    //                         dates.length > 1
    //                             ? [parseInt(dates[0]), parseInt(dates[1])]
    //                             : [parseInt(dates[0]), parseInt(dates[0])],
    //                     description: dateAndDesc[1],
    //                 };
    //                 return data;
    //             });
    //         const experience: ExperienceAndEducation = {
    //             _id: new ObjectId(),
    //             name: AllowedExperienceAndEducationTypes.Experience,
    //             data: experienceData,
    //             doctorId: doctor._id,
    //         };
    //         await this.experienceAndEducationCollection.insertOne(experience);
    //         //=============================

    //         // SPECIALIZATIONS ADDING TO DB
    //         if (_specializations) {
    //             const specializations =
    //                 _specializations && _specializations.toString().split(', ');
    //             specializations &&
    //                 Promise.all(
    //                     specializations.map(async (val) => {
    //                         const specialization: Specialization = {
    //                             _id: new ObjectId(),
    //                             description: 'это блять специализация',
    //                             name: val,
    //                             doctorIds: [doctor._id],
    //                         };
    //                         const checkIfExists =
    //                             await this.specializationCollection.findOne<Specialization>(
    //                                 {
    //                                     name: val,
    //                                 },
    //                             );
    //                         if (!checkIfExists) {
    //                             await this.specializationCollection.insertOne(
    //                                 specialization,
    //                             );
    //                             return;
    //                         }
    //                         await this.specializationCollection.updateOne(
    //                             { name: val },
    //                             { $addToSet: { doctorIds: doctor._id } },
    //                         );
    //                     }),
    //                 );
    //             // =============================
    //         }
    //     }
    // }

    // async addServicesToDatabase(serviceSheet: excel.Worksheet) {
    //     for (let i = 2; i < 251; i++) {
    //         const [_specializations, name, isViewed, price, childAllowed] = [
    //             serviceSheet.getRow(i).getCell(1).value as string,
    //             serviceSheet.getRow(i).getCell(2).value as string,
    //             serviceSheet.getRow(i).getCell(3).value as string,
    //             serviceSheet.getRow(i).getCell(4).value as number | string,
    //             serviceSheet.getRow(i).getCell(6).value as string,
    //         ];
    //         const specializations = _specializations.toString().split(', ');
    //         const specializationId = await Promise.all(
    //             specializations.map(async (val) => {
    //                 const specialization =
    //                     await this.specializationCollection.findOne({
    //                         name: val,
    //                     });
    //                 return specialization && specialization._id;
    //             }),
    //         );

    //         const service: Service = {
    //             _id: new ObjectId(),
    //             name,
    //             description: 'this is a service',
    //             price:
    //                 typeof price === 'number'
    //                     ? price
    //                     : Number(price.replace('от ', '')),
    //             isShown: isViewed === 'Да' ? undefined : false,
    //             specializationId,
    //         };
    //         await this.serviceCollection.insertOne(service, {
    //             ignoreUndefined: true,
    //         });
    //     }
    // }
}
