import { Field, ObjectType } from '@nestjs/graphql';
import { PhotoURLGraph } from 'src/modules/helpers/uploadFiles/imageUpload/photoURL.model';
import { Modify } from 'src/utils/modifyType';
import { User } from './user.interface';
import { PeculiaritiesGraph } from './utils/peculiarities.model';

@ObjectType('User')
export class UserGraph
    implements
        Modify<
            Omit<User, 'passwordHASH'>,
            {
                _id: string;
                peculiarities?: PeculiaritiesGraph;
            }
        >
{
    @Field()
    _id: string;

    @Field({ nullable: true })
    fullName: string;

    @Field({ nullable: true })
    phoneNumber: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    dateOfBirth: Date;

    @Field({ nullable: true })
    token?: string;

    @Field(() => PhotoURLGraph, { nullable: true })
    photoURL: PhotoURLGraph;

    @Field(() => PeculiaritiesGraph, { nullable: true })
    peculiarities?: PeculiaritiesGraph;

    constructor(user: Partial<User>) {
        if (user._id != null) this._id = user._id.toHexString();
        if (user.fullName != null) this.fullName = user.fullName;
        if (user.phoneNumber != null) this.phoneNumber = user.phoneNumber;
        if (user.email != null) this.email = user.email;
        if (user.dateOfBirth != null) this.dateOfBirth = user.dateOfBirth;
        if (user.token != null) this.token = user.token;
        if (user.photoURL != null)
            this.photoURL = new PhotoURLGraph({ ...user.photoURL });
        if (user.peculiarities != null)
            this.peculiarities = new PeculiaritiesGraph({
                ...user.peculiarities,
            });
        if (user.dateOfBirth == null)
            this.dateOfBirth = new Date(
                new Date().setFullYear(new Date().getFullYear() - 18),
            );
    }
}
