import { Injectable } from '@nestjs/common';
import { Modify } from 'src/utils/modifyType';
import { Doctor } from './doctor.interface';

export const doctorSchema = {
    name: 'doctor',
    fields: [
        { name: 'fullName', type: 'string' },
        { name: 'yearsOfExperience', type: 'int32' },
        { name: 'description', type: 'string' },
        { name: 'serviceIds', type: 'string[]', facet: true, optional: true },
        { name: '_id', type: 'string', optional: true },
        { name: 'phoneNumber', type: 'string' },
        { name: 'numberOfRatings', type: 'int32', optional: true },
        { name: 'sumOfRatings', type: 'int32', optional: true },
        { name: 'dateOfBirth', type: 'string' },
        { name: 'email', type: 'string'}
    ],
    default_sorting_field: 'yearsOfExperience',
};

export interface DoctorSearch extends Modify<Doctor, {
    _id: string
}> { }
