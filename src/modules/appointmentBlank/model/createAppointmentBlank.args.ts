import { ArgsType, Field } from '@nestjs/graphql';
import { CreateAppointmentResults } from './parts/AppointmenResults.model';
import { CreateComplaint } from './parts/complaint.model';
import { CreateDiagnose } from './parts/diagnose.model';
import { CreateInspections } from './parts/inspections.model';

@ArgsType()
export class CreateAppointmentBlank {
    @Field(() => CreateComplaint, { nullable: true })
    complaint: CreateComplaint;

    @Field(() => CreateDiagnose, { nullable: true })
    diagnose: CreateDiagnose;

    @Field(() => CreateInspections, { nullable: true })
    inspections: CreateInspections;

    @Field()
    sessionId: string;

    @Field(() => CreateAppointmentResults, { nullable: true })
    appointmentResults: CreateAppointmentResults;
}
