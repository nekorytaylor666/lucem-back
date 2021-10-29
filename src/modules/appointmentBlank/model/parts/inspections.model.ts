import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Session } from 'src/modules/session/model/session.interface';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface Inspections extends AppointmentBlank {
    _id: ObjectId;
    doctorId: ObjectId;
    inspections: string[];
}

@ObjectType('Inspections')
export class InspectionsGraph {
    @Field()
    _id: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => [String])
    inspections: string[];

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => SessionGraph, { nullable: true })
    session: SessionGraph;

    constructor(
        inspections: Partial<Inspections> & {
            doctor: Doctor;
            user?: User;
            session?: Session;
        },
    ) {
        if (inspections._id) this._id = inspections._id.toHexString();
        if (inspections.doctor)
            this.doctor = new DoctorGraph({ ...inspections.doctor });
        if (inspections.inspections) this.inspections = inspections.inspections;
        if (inspections.user)
            this.session = new SessionGraph({ ...inspections.session });
    }
}
