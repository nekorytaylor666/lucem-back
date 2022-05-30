import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';

export interface Diagnose {
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

@InputType()
export class EditDiagnoseInput {
    @Field(() => Boolean, { nullable: true })
    preliminary?: boolean;

    @Field({ nullable: true })
    deseaseDBCode?: string;

    @Field({ nullable: true })
    diagnose?: string;

    @Field({ nullable: true })
    natureOfTheDesease?: string;

    @Field()
    doctorId: string;
}

@ObjectType('Diagnose')
export class DiagnoseGraph
    implements
        Modify<
            Diagnose,
            {
                doctorId: string;
            }
        >
{
    @Field(() => Boolean)
    preliminary: boolean;

    @Field({ nullable: true })
    deseaseDBCode: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;

    @Field()
    doctorId: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(
        diagnose: Partial<
            Diagnose & {
                doctor: Doctor;
            }
        >,
    ) {
        if (diagnose.preliminary != undefined)
            this.preliminary = diagnose.preliminary;
        if (diagnose.diagnose != null) this.diagnose = diagnose.diagnose;
        if (diagnose.natureOfTheDesease != null)
            this.natureOfTheDesease = diagnose.natureOfTheDesease;
        if (diagnose.deseaseDBCode != null)
            this.deseaseDBCode = diagnose.deseaseDBCode;
        if (diagnose.doctorId != null)
            this.doctorId = diagnose.doctorId.toHexString();
        if (diagnose.doctor != null)
            this.doctor = new DoctorGraph({ ...diagnose.doctor });
    }
}
