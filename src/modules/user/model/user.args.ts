import { ArgsType, Field } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { User } from "./user.interface";


@ArgsType()
export class CreateUser implements Modify<Partial<User>, {
    dateOfBirth: string
}> {
    @Field()
    fullName: string;

    @Field()
    dateOfBirth: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    password: string;
}