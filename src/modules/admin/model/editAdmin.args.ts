import { ArgsType, Field } from "@nestjs/graphql";
import { Admin } from "./admin.interface";


@ArgsType()
export class EditAdmin implements Omit<Admin, "_id" | "passwordHASH">{
    @Field({ nullable: true })
    fullName: string;

    @Field({ nullable: true })
    phoneNumber: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    oldPassword: string;

    @Field({ nullable: true })
    newPassword: string;
}