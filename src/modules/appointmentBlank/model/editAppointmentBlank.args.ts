import { ArgsType, Field } from '@nestjs/graphql';
import { EditAppointmentResultsInput } from './parts/AppointmenResults.model';
import { EditComplaintInput } from './parts/complaint.model';
import { EditDiagnoseInput } from './parts/diagnose.model';

@ArgsType()
export class EditAppointmentBlank {
    @Field()
    sessionId: string;

    @Field(() => EditComplaintInput, { nullable: true })
    complaints: EditComplaintInput;

    @Field(() => EditAppointmentResultsInput, { nullable: true })
    appointmentResults: EditAppointmentResultsInput;

    @Field(() => [String], { nullable: true })
    inspections: string[];

    @Field(() => EditDiagnoseInput, { nullable: true })
    diagnose: EditDiagnoseInput;
}
