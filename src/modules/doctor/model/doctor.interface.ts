import { registerEnumType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { PhotoURL } from '../../helpers/uploadFiles/imageUpload/photoURL.interface';
import { ExperienceAndEducation } from './utils/experience/experience.model';
import { Language } from './utils/language/language.model';
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
    numberOfRatings?: number;
    sumOfRatings?: number;
    description: string;
    acceptableAgeGroup: AcceptableAgeGroup;
    avatar?: PhotoURL;
    experiences?: ExperienceAndEducation[];
    languages: Language[];
    startingExperienceDate: Date;
    workTimes?: WorkTime[];
    cabinet: string;
}

registerEnumType(AcceptableAgeGroup, {
    name: 'AcceptableAgeGroup',
});
