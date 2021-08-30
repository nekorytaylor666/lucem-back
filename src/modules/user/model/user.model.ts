import { Field, ObjectType } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { User } from "./user.interface";




@ObjectType('User')
export class UserGraph implements Modify<Omit<User, "passwordHASH">, {
    _id: string
}> {
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    phoneNumber: string;

    @Field()
    email: string;

    @Field()
    dateOfBirth: Date;

    @Field({ nullable: true })
    token?: string;

    constructor(user: Partial<User>) {
        if (user._id) this._id = user._id.toHexString();
        if (user.fullName) this.fullName = user.fullName;
        if (user.phoneNumber) this.phoneNumber = user.phoneNumber;
        if (user.email) this.email = user.email;
        if (user.dateOfBirth) this.dateOfBirth = user.dateOfBirth;
        if (user.token) this.token = user.token;
    }


}