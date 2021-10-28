import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';

export interface Diagnose {
    _id: ObjectId;
    preliminary: boolean;
    deseaseDBCode?: string;
    diagnose: string;
    natureOfTheDesease: string;
    doctorId: ObjectId;
}

@InputType()
export class CreateDiagnose {
    @Field(() => Boolean)
    preliminary: boolean;

    @Field({ nullable: true })
    deseaseDBCode?: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;
}

@ObjectType('Diagnose')
export class DiagnoseGraph
    implements
        Modify<
            Omit<Diagnose, 'doctorId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => Boolean)
    preliminary: boolean;

    @Field()
    deseaseDBCode: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(diagnose: Partial<Diagnose> & { doctor?: Doctor }) {
        if (diagnose._id) this._id = diagnose._id.toHexString();
        if (diagnose.preliminary != undefined)
            this.preliminary = diagnose.preliminary;
        if (diagnose.diagnose) this.diagnose = diagnose.diagnose;
        if (diagnose.natureOfTheDesease)
            this.natureOfTheDesease = diagnose.natureOfTheDesease;
        if (diagnose.deseaseDBCode) this.deseaseDBCode = diagnose.deseaseDBCode;
        if (diagnose.doctor)
            this.doctor = new DoctorGraph({ ...diagnose.doctor });
    }
}
