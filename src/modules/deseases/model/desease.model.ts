import { Field, ObjectType } from '@nestjs/graphql';
import { Desease } from './desease.interface';
import { Modify } from '../../../utils/modifyType';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';

@ObjectType('Desease')
export class DeseaseGraph implements Modify<Desease, { _id: string }> {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    name: string;

    @Field(() => [DoctorGraph], { nullable: true })
    doctors: DoctorGraph[];

    constructor(desease: Partial<Desease> & { doctors?: Doctor[] }) {
        if (desease.name != null) this.name = desease.name;
        if (desease._id != null) this._id = desease._id.toHexString();
        if (desease.doctors != null)
            this.doctors = desease.doctors.map(
                (val) => new DoctorGraph({ ...val }),
            );
    }
}
