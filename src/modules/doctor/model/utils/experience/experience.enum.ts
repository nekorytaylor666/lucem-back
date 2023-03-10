import { registerEnumType } from '@nestjs/graphql';

export enum AllowedExperienceAndEducationTypes {
    Education = 'education',
    Experience = 'experience',
    Courses = 'courses',
}

registerEnumType(AllowedExperienceAndEducationTypes, {
    name: 'AllowedExperienceAndEducationTypes',
});
