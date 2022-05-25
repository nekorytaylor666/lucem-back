import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { UserGraph } from 'src/modules/user/model/user.model';
import {
    AppointmentResults,
    AppointmentResultsGraph,
} from './parts/AppointmenResults.model';
import { Complaint, ComplaintGraph } from './parts/complaint.model';
import { Diagnose, DiagnoseGraph } from './parts/diagnose.model';
import { Inspections, InspectionsGraph } from './parts/inspections.model';

export interface AppointmentBlank {
    _id: ObjectId;
    userId: ObjectId;
    owners: {
        doctorId: ObjectId;
        sessionId?: ObjectId;
        serviceId: ObjectId;
    }[];
    complaint?: Complaint;
    inspections?: Inspections[];
    diagnose?: Diagnose;
    appointmentResults?: AppointmentResults;
}

@ObjectType()
export class AppointmentBlankGraph {
    @Field()
    userId: string;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    @Field(() => ComplaintGraph, { nullable: true })
    complaint: ComplaintGraph;

    @Field(() => DiagnoseGraph, { nullable: true })
    diagnose: DiagnoseGraph;

    @Field(() => [InspectionsGraph], { nullable: true })
    inspections: InspectionsGraph[];

    @Field(() => AppointmentResultsGraph, { nullable: true })
    appointmentResults: AppointmentResultsGraph;

    constructor(args: Partial<AppointmentBlank>) {
        if (args.appointmentResults != null)
            this.appointmentResults = new AppointmentResultsGraph({
                ...args.appointmentResults,
            });
        if (args.complaint != null)
            this.complaint = new ComplaintGraph({ ...args.complaint });
        if (args.diagnose != null)
            this.diagnose = new DiagnoseGraph({ ...args.diagnose });
        if (args.inspections != null)
            this.inspections = args.inspections.map(
                (val) => new InspectionsGraph({ ...val }),
            );
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
