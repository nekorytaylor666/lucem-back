import { ArgsType, Field } from "@nestjs/graphql";
import { CreateAppointmentResults } from "./addictives/AppointmenResults.model";
import { CreateComplaint } from "./addictives/complaint.model";
import { CreateDiagnose } from "./addictives/diagnose.model";


@ArgsType()
export class CreateAppointmentBlank {
    @Field(() => CreateComplaint)
    complaints: CreateComplaint;

    @Field(() => CreateDiagnose)
    diagnose: CreateDiagnose;

    @Field(() => CreateAppointmentResults)
    appointmentResults: CreateAppointmentResults;

    @Field()
    sessionId: string;
}