import { ArgsType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Modify } from 'src/utils/modifyType';
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

    @Field(() => [String], { nullable: true })
    deseasesIDs?: string[];

    @Field(() => Int)
    yearsOfExperience: number;

    @Field()
    description: string;

    @Field()
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => GraphQLUpload)
    avatar: Promise<FileUpload>;

    @Field(() => ExperienceInput, { nullable: true })
    experience: ExperienceInput[];
}
