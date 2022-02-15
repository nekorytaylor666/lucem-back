import { Field, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Doctor } from './doctor.interface';
import { DoctorGraph } from './doctor.model';

export interface DoctorToken {
    doctor: Doctor;
    token: string;
}

@ObjectType()
export class DoctorTokenGraph
    implements
        Modify<
            DoctorToken,
            {
                doctor: DoctorGraph;
            }
        >
{
    @Field(() => DoctorGraph)
    doctor: DoctorGraph;

    @Field()
    token: string;

    constructor(args: Partial<DoctorToken>) {
        if (args.doctor != null)
            this.doctor = new DoctorGraph({ ...args.doctor });
        if (args.token != null) this.token = args.token;
    }
}
