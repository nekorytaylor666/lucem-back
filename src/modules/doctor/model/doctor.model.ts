import { Field, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Doctor } from './doctor.interface';

@ObjectType('Doctor')
export class DoctorGraph
    implements Modify<Omit<Doctor, 'passwordHASH'>, { _id: string }>
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

    @Field(() => Date)
    dateOfBirth: Date;

    constructor(doctor: Partial<Doctor>) {
        if (doctor._id) this._id = doctor._id.toHexString()
        if (doctor.fullName) this.fullName = doctor.fullName;
        if (doctor.email) this.email = doctor.email;
        if (doctor.phoneNumber) this.phoneNumber = doctor.phoneNumber;
        if (doctor.token) this.token = doctor.token;
        if (doctor.dateOfBirth) this.dateOfBirth = doctor.dateOfBirth;
    }
}
