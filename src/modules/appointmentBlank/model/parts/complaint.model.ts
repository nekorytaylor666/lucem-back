import { Field, InputType, ObjectType } from '@nestjs/graphql';

export interface Complaint {
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
export class ComplaintGraph implements Complaint {
    @Field()
    complaint: string;

    @Field()
    sicknessTimeDuration: string;

    @Field()
    reason: string;

    constructor(complaint: Partial<Complaint>) {
        if (complaint.complaint != null) this.complaint = complaint.complaint;
        if (complaint.reason != null) this.reason = complaint.reason;
        if (complaint.sicknessTimeDuration != null)
            this.sicknessTimeDuration = complaint.sicknessTimeDuration;
    }
}
