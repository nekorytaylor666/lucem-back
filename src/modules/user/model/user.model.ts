import { Field, ObjectType } from "@nestjs/graphql";
import { PhotoURL } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.interface";
import { PhotoURLGraph } from "src/modules/helpers/uploadFiles/imageUpload/photoURL.model";
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

    @Field(() => PhotoURLGraph, { nullable: true })
    photoURL: PhotoURLGraph;

    constructor(user: Partial<User>) {
        if (user._id) this._id = user._id.toHexString();
        if (user.fullName) this.fullName = user.fullName;
        if (user.phoneNumber) this.phoneNumber = user.phoneNumber;
        if (user.email) this.email = user.email;
        if (user.dateOfBirth) this.dateOfBirth = user.dateOfBirth;
        if (user.token) this.token = user.token;
        if (user.photoURL) this.photoURL = new PhotoURLGraph({...user.photoURL});
    }


}