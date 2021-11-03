import { Field, InputType, Int } from '@nestjs/graphql';
import { AllowedExperienceAndEducationTypes } from './experience.enum';

@InputType()
export class ExperienceDataInput {
    @Field(() => Int)
    years: [number, number];

    @Field()
    description: string;
}

@InputType()
export class ExperienceInput {
    @Field(() => AllowedExperienceAndEducationTypes)
    name: AllowedExperienceAndEducationTypes;

    @Field(() => ExperienceDataInput)
    data: ExperienceDataInput[];
}
