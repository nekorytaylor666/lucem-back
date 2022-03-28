import { ArgsType, Field } from '@nestjs/graphql';
import { CreateAppointmentResults } from './parts/AppointmenResults.model';
import { CreateComplaint } from './parts/complaint.model';
import { CreateDiagnose } from './parts/diagnose.model';

@ArgsType()
export class CreateAppointmentBlank {
    @Field(() => CreateComplaint, { nullable: true })
    complaints: CreateComplaint;

    @Field(() => CreateDiagnose, { nullable: true })
    diagnose: CreateDiagnose;

    @Field(() => [String], { nullable: true })
    inspections: string[];

    @Field()
    sessionId: string;

    @Field(() => CreateAppointmentResults, { nullable: true })
    appointmentResults: CreateAppointmentResults;
}
