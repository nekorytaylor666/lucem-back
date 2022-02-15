import { ArgsType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Modify } from 'src/utils/modifyType';
import { AllowedDoctorLanguages } from './doctor.enum';
import { AcceptableAgeGroup, Doctor } from './doctor.interface';
import { ExperienceInput } from './parts/experience.input';

@ArgsType()
export class CreateDoctor
    implements
        Modify<
            Omit<Doctor, '_id' | 'token' | 'passwordHASH'>,
            {
                deseasesIDs?: string[];
                avatar: Promise<FileUpload>;
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

    @Field(() => [AllowedDoctorLanguages])
    languages: AllowedDoctorLanguages[];
}
