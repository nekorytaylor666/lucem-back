import { registerEnumType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { PhotoURL } from '../../helpers/uploadFiles/imageUpload/photoURL.interface';
import { AllowedDoctorLanguages } from './doctor.enum';
import { ExperienceAndEducation } from './utils/experience/experience.model';
import { WorkTime } from './utils/workTime/workTime.model';

export enum AcceptableAgeGroup {
    Adult = 'adult',
    Child = 'child',
    Both = 'both',
}

export interface Doctor {
    _id: ObjectId;
    fullName: string;
    email: string;
    phoneNumber: string;
    passwordHASH: string;
    serviceIds?: ObjectId[];
    numberOfRatings?: number;
    sumOfRatings?: number;
    description: string;
    acceptableAgeGroup: AcceptableAgeGroup;
    avatar?: PhotoURL;
    experiences?: ExperienceAndEducation[];
    languages: AllowedDoctorLanguages[];
    startingExperienceDate: Date;
    workTimes?: WorkTime[];
}

registerEnumType(AcceptableAgeGroup, {
    name: 'AcceptableAgeGroup',
});
