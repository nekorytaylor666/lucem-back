import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Modify } from 'src/utils/modifyType';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';
import { ExperienceInput } from './utils/experience/experience.input';
import { ExperienceAndEducation } from './utils/experience/experience.model';
import { LanguageInput } from './utils/language/language.model';
import { WorkTimeInput } from './utils/workTime/workTime.model';

@ArgsType()
export class EditDoctor
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
    doctorId: string;

    @Field({ nullable: true })
    fullName: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phoneNumber: string;

    @Field({ nullable: true })
    password: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    dateOfBirth: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    startingExperienceDate: Date;

    @Field({ nullable: true })
    description: string;

    @Field(() => AcceptableAgeGroup, { nullable: true })
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => GraphQLUpload, { nullable: true })
    avatar: Promise<FileUpload>;

    @Field(() => [ExperienceInput], { nullable: true })
    experiences?: ExperienceAndEducation[];

    @Field(() => [LanguageInput], { nullable: true })
    languages: LanguageInput[];

    @Field(() => [WorkTimeInput], { nullable: true })
    workTimes?: WorkTimeInput[];

    @Field({ nullable: true })
    cabinet?: string;

    @Field(() => [String], { nullable: true })
    specializationIds: string[];
}
