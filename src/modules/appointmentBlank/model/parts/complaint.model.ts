import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'bson';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';

export interface Complaint {
    _id: ObjectId;
    complaint: string;
    sicknessTimeDuration: string;
    reason?: string;
    doctorId: ObjectId;
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

@ObjectType('Complain')
export class ComplaintGraph
    implements
        Modify<
            Omit<Complaint, 'doctorId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    complaint: string;

    @Field()
    sicknessTimeDuration: string;

    @Field()
    reason: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(complaint: Partial<Complaint> & { doctor?: Doctor }) {
        if (complaint._id) this._id = complaint._id.toHexString();
        if (complaint.complaint != null) this.complaint = complaint.complaint;
        if (complaint.reason != null) this.reason = complaint.reason;
        if (complaint.sicknessTimeDuration != null)
            this.sicknessTimeDuration = complaint.sicknessTimeDuration;
        if (complaint.doctor)
            this.doctor = new DoctorGraph({ ...complaint.doctor });
    }
}
