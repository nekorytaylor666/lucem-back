import { createUnionType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { AppointmentResultsGraph } from './parts/AppointmenResults.model';
import { ComplaintGraph } from './parts/complaint.model';
import { DiagnoseGraph } from './parts/diagnose.model';
import { InspectionsGraph } from './parts/inspections.model';

export interface AppointmentBlank {
    doctorId: ObjectId;
    userId: ObjectId;
    sessionId: ObjectId;
}

export const AppointmentBlankGraph = createUnionType({
    name: 'AppointmentBlank',
    types: () => [
        ComplaintGraph,
        DiagnoseGraph,
        InspectionsGraph,
        AppointmentResultsGraph,
    ],
});
