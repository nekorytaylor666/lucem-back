import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Modify } from 'src/utils/modifyType';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';
import { ExperienceInput } from './utils/experience/experience.input';
import { LanguageInput } from './utils/language/language.model';
import { WorkTimeInput } from './utils/workTime/workTime.model';

@ArgsType()
export class CreateDoctor
    implements
        Modify<
            Omit<Doctor, '_id' | 'token' | 'passwordHASH'>,
            {
                deseasesIDs?: string[];
                avatar: Promise<FileUpload>;
                workTimes?: WorkTimeInput[];
            }
        >
{
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    password: string;

    @Field(() => GraphQLISODateTime)
    dateOfBirth: Date;

    @Field(() => GraphQLISODateTime)
    startingExperienceDate: Date;

    @Field()
    description: string;

    @Field(() => AcceptableAgeGroup)
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => GraphQLUpload, { nullable: true })
    avatar: Promise<FileUpload>;

    @Field(() => [ExperienceInput], { nullable: true })
    experience: ExperienceInput[];

    @Field(() => [LanguageInput])
    languages: LanguageInput[];

    @Field(() => [WorkTimeInput], { nullable: true })
    workTimes?: WorkTimeInput[];

    @Field()
    cabinet: string;

    @Field(() => [String], { nullable: true })
    specializationIds: string[];
}
