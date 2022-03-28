import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Session } from 'src/modules/session/model/session.interface';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface Complaint extends AppointmentBlank {
    _id: ObjectId;
    complaint: string;
    sicknessTimeDuration: string;
    reason?: string;
}

@InputType()
export class CreateComplaint {
    @Field()
    complaint: string;

    @Field()
    sicknessTimeDuration: string;

    @Field({ nullable: true })
    reason: string;
}

@InputType()
export class EditComplaintInput {
    @Field({ nullable: true })
    complaint: string;

    @Field({ nullable: true })
    sicknessTimeDuration: string;

    @Field({ nullable: true })
    reason: string;
}

@ObjectType('Complain')
export class ComplaintGraph
    implements
        Modify<
            Omit<Complaint, 'doctorId' | 'userId' | 'sessionId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    complaint: string;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => SessionGraph, { nullable: true })
    session: SessionGraph;

    @Field()
    sicknessTimeDuration: string;

    @Field()
    reason: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(
        complaint: Partial<Complaint> & {
            doctor?: Doctor;
            user?: User;
            session?: Session;
        },
    ) {
        if (complaint._id != null) this._id = complaint._id.toHexString();
        if (complaint.complaint != null) this.complaint = complaint.complaint;
        if (complaint.reason != null) this.reason = complaint.reason;
        if (complaint.sicknessTimeDuration != null)
            this.sicknessTimeDuration = complaint.sicknessTimeDuration;
        if (complaint.doctor != null)
            this.doctor = new DoctorGraph({ ...complaint.doctor });
        if (complaint.user != null)
            this.user = new UserGraph({ ...complaint.user });
        if (complaint.session != null)
            this.session = new SessionGraph({ ...complaint.session });
    }
}
