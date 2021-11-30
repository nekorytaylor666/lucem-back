import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Session } from 'src/modules/session/model/session.interface';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface Diagnose extends AppointmentBlank {
    _id: ObjectId;
    preliminary: boolean;
    deseaseDBCode?: string;
    diagnose: string;
    natureOfTheDesease: string;
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
            Omit<Diagnose, 'doctorId' | 'userId' | 'sessionId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => Boolean)
    preliminary: boolean;

    @Field({ nullable: true })
    deseaseDBCode: string;

    @Field()
    diagnose: string;

    @Field()
    natureOfTheDesease: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => SessionGraph, { nullable: true })
    session: SessionGraph;

    constructor(
        diagnose: Partial<Diagnose> & {
            doctor?: Doctor;
            user?: User;
            session?: Session;
        },
    ) {
        if (diagnose._id != null) this._id = diagnose._id.toHexString();
        if (diagnose.preliminary != undefined)
            this.preliminary = diagnose.preliminary;
        if (diagnose.diagnose != null) this.diagnose = diagnose.diagnose;
        if (diagnose.natureOfTheDesease != null)
            this.natureOfTheDesease = diagnose.natureOfTheDesease;
        if (diagnose.deseaseDBCode != null) this.deseaseDBCode = diagnose.deseaseDBCode;
        if (diagnose.doctor != null)
            this.doctor = new DoctorGraph({ ...diagnose.doctor });
        if (diagnose.user != null) this.user = new UserGraph({ ...diagnose.user });
        if (diagnose.session != null)
            this.session = new SessionGraph({ ...diagnose.session });
    }
}
