import { ArgsType, Field } from '@nestjs/graphql';
import { CreateAppointmentResults } from './parts/AppointmenResults.model';
import { CreateComplaint } from './parts/complaint.model';
import { CreateDiagnose } from './parts/diagnose.model';

@ArgsType()
export class CreateAppointmentBlank {
    @Field(() => CreateComplaint)
    complaints: CreateComplaint;

    @Field(() => CreateDiagnose)
    diagnose: CreateDiagnose;

    @Field(() => CreateAppointmentResults)
    appointmentResults: CreateAppointmentResults;

    @Field(() => [String])
    inspections: string[];

    @Field()
    sessionId: string;
}
