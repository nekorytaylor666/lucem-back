import { ArgsType, Field } from '@nestjs/graphql';
import { EditAppointmentResultsInput } from './parts/AppointmenResults.model';
import { EditComplaintInput } from './parts/complaint.model';
import { EditDiagnoseInput } from './parts/diagnose.model';
import { CreateInspections } from './parts/inspections.model';

@ArgsType()
export class EditAppointmentBlank {
    @Field()
    appointmentBlankId: string;

    @Field(() => EditComplaintInput, { nullable: true })
    complaints: EditComplaintInput;

    @Field(() => EditAppointmentResultsInput, { nullable: true })
    appointmentResults: EditAppointmentResultsInput;

    @Field(() => CreateInspections, { nullable: true })
    inspections: CreateInspections;

    @Field(() => EditDiagnoseInput, { nullable: true })
    diagnose: EditDiagnoseInput;
}
