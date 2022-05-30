import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Modify } from 'src/utils/modifyType';

export interface Complaint {
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

@InputType()
export class EditComplaintInput {
    @Field({ nullable: true })
    complaint: string;

    @Field({ nullable: true })
    sicknessTimeDuration: string;

    @Field({ nullable: true })
    reason: string;

    @Field()
    doctorId: string;
}

@ObjectType('Complain')
export class ComplaintGraph
    implements
        Modify<
            Complaint,
            {
                doctorId: string;
            }
        >
{
    @Field()
    complaint: string;

    @Field()
    sicknessTimeDuration: string;

    @Field()
    reason: string;

    @Field()
    doctorId: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    constructor(
        complaint: Partial<
            Complaint & {
                doctor: Doctor;
            }
        >,
    ) {
        if (complaint.complaint != null) this.complaint = complaint.complaint;
        if (complaint.reason != null) this.reason = complaint.reason;
        if (complaint.sicknessTimeDuration != null)
            this.sicknessTimeDuration = complaint.sicknessTimeDuration;
        if (complaint.doctorId != null)
            this.doctorId = complaint.doctorId.toHexString();
        if (complaint.doctor != null)
            this.doctor = new DoctorGraph({ ...complaint.doctor });
    }
}
