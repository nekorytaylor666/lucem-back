import { createUnionType } from '@nestjs/graphql';
import { AppointmentResultsGraph } from './parts/AppointmenResults.model';
import { ComplaintGraph } from './parts/complaint.model';
import { DiagnoseGraph } from './parts/diagnose.model';
import { InspectionsGraph } from './parts/inspections.model';

export const AppointmentBlankGraph = createUnionType({
    name: 'AppointmentBlank',
    types: () => [
        ComplaintGraph,
        DiagnoseGraph,
        AppointmentResultsGraph,
        InspectionsGraph,
    ],
});
