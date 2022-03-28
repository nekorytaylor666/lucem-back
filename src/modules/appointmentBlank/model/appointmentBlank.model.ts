import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import {
    AppointmentResults,
    AppointmentResultsGraph,
} from './parts/AppointmenResults.model';
import { Complaint, ComplaintGraph } from './parts/complaint.model';
import { Diagnose, DiagnoseGraph } from './parts/diagnose.model';
import { Inspections, InspectionsGraph } from './parts/inspections.model';

export interface AppointmentBlank {
    doctorId: ObjectId;
    userId: ObjectId;
    sessionId: ObjectId;
}

@ObjectType()
export class AppointmentBlankGraph {
    @Field(() => ComplaintGraph, { nullable: true })
    complaint: ComplaintGraph;

    @Field(() => DiagnoseGraph, { nullable: true })
    diagnose: DiagnoseGraph;

    @Field(() => InspectionsGraph, { nullable: true })
    inspection: InspectionsGraph;

    @Field(() => AppointmentResultsGraph, { nullable: true })
    appointmentResults: AppointmentResultsGraph;

    constructor(
        args: Partial<{
            complaint: Complaint;
            diagnose: Diagnose;
            inspection: Inspections;
            appointmentResults: AppointmentResults;
        }>,
    ) {
        if (args.appointmentResults != null)
            this.appointmentResults = new AppointmentResultsGraph({
                ...args.appointmentResults,
            });
        if (args.complaint != null)
            this.complaint = new ComplaintGraph({ ...args.complaint });
        if (args.diagnose != null)
            this.diagnose = new DiagnoseGraph({ ...args.diagnose });
        if (args.inspection != null)
            this.inspection = new InspectionsGraph({ ...args.inspection });
    }
}

// export const AppointmentBlankGraph = createUnionType({
//     name: 'AppointmentBlank',
//     types: () => [
//         ComplaintGraph,
//         DiagnoseGraph,
//         InspectionsGraph,
//         AppointmentResultsGraph,
//     ],
// });
