import { registerEnumType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { PhotoURL } from '../../helpers/uploadFiles/imageUpload/photoURL.interface';

export enum AcceptableAgeGroup {
    Adult = 'adult',
    Child = 'child',
    Both = 'both',
}

export interface Doctor {
    _id?: ObjectId;
    fullName: string;
    email: string;
    phoneNumber: string;
    token?: string;
    passwordHASH: string;
    serviceIds?: string[];
    yearsOfExperience: number;
    numberOfRatings?: number;
    sumOfRatings?: number;
    description: string;
    acceptableAgeGroup: AcceptableAgeGroup;
    avatar?: PhotoURL;
}

registerEnumType(AcceptableAgeGroup, {
    name: 'AcceptableAgeGroup',
});
