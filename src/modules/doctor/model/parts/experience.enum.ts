import { registerEnumType } from '@nestjs/graphql';

export enum AllowedExperienceAndEducationTypes {
    Education = 'education',
    Experience = 'experience',
}

registerEnumType(AllowedExperienceAndEducationTypes, {
    name: 'AllowedExperienceAndEducationTypes',
});
