import { ArgsType, Field, Int } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Modify } from "src/utils/modifyType";
import { AcceptableAgeGroup, Doctor } from "./doctor.interface";


@ArgsType()
export class CreateDoctor implements Modify<Omit<Doctor, "_id" | "token" | "passwordHASH">, { dateOfBirth: string, deseasesIDs?: string[] }>{
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    password: string;

    @Field()
    dateOfBirth: string;

    @Field(() => [String], { nullable: true })
    deseasesIDs?: string[];

    @Field(() => Int)
    yearsOfExperience: number;

    @Field()
    description: string;

    @Field()
    acceptableAgeGroup: AcceptableAgeGroup;

    @Field(() => GraphQLUpload)
    avatar: Promise<FileUpload>
}