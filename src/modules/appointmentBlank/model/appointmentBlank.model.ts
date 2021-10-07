import { Field, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { AppointmentResultsGraph } from './addictives/AppointmenResults.model';
import { ComplaintGraph } from './addictives/complaint.model';
import { DiagnoseGraph } from './addictives/diagnose.model';
import { AppointmentBlank } from './appointmentBlank.interface';

@ObjectType()
export class AppointmentBlankGraph
    implements
        Modify<
            AppointmentBlank,
            {
                _id: string;
                complaints: ComplaintGraph;
                appointmentResults: AppointmentResultsGraph;
                diagnose: DiagnoseGraph;
                sessionId: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => ComplaintGraph)
    complaints: ComplaintGraph;

    @Field(() => AppointmentResultsGraph)
    appointmentResults: AppointmentResultsGraph;

    @Field(() => DiagnoseGraph)
    diagnose: DiagnoseGraph;

    @Field()
    sessionId: string;

    constructor(appointmentBlank: Partial<AppointmentBlank>) {
        if (appointmentBlank._id) this._id = appointmentBlank._id.toHexString();
        if (appointmentBlank.appointmentResults)
            this.appointmentResults = new AppointmentResultsGraph({
                ...appointmentBlank.appointmentResults,
            });
        if (appointmentBlank.complaints)
            this.complaints = new ComplaintGraph({
                ...appointmentBlank.complaints,
            });
        if (appointmentBlank.diagnose)
            this.diagnose = new DiagnoseGraph({ ...appointmentBlank.diagnose });
        if (appointmentBlank.sessionId)
            this.sessionId = appointmentBlank.sessionId.toHexString();
    }
}
