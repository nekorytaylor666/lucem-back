import { Field, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Admin } from './admin.interface';

@ObjectType('Admin')
export class AdminGraph
    implements
        Modify<
            Admin,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field({ nullable: true })
    token?: string;

    @Field()
    passwordHASH: string;

    constructor(admin: Partial<Admin> & { token?: string }) {
        if (admin._id != null) this._id = admin._id.toHexString();
        if (admin.email != null) this.email = admin.email;
        if (admin.phoneNumber != null) this.phoneNumber = admin.phoneNumber;
        if (admin.fullName != null) this.fullName = admin.fullName;
        if (admin.token != null) this.token = admin.token;
        if (admin.passwordHASH != null) this.passwordHASH = admin.passwordHASH;
    }
}
