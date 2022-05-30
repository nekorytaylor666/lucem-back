import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { Session } from 'src/modules/session/model/session.interface';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
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
    appointmentResults?: AppointmentResults[];
    dateCreated: Date;
}

@ObjectType()
export class AppointmentBlankOwnersGraph {
    @Field(() => DoctorGraph, { nullable: true })
    addedByDoctor: DoctorGraph;

    @Field({ nullable: true })
    addedByDoctorId?: string;

    @Field(() => DoctorGraph, { nullable: true })
    doctor?: DoctorGraph;

    @Field()
    doctorId: string;

    @Field(() => SessionGraph, { nullable: true })
    session?: SessionGraph;

    @Field({ nullable: true })
    sessionId?: string;

    @Field(() => ServiceGraph, { nullable: true })
    service?: ServiceGraph;

    @Field()
    serviceId: string;

    constructor(
        args: Partial<{
            addedByDoctorId?: ObjectId;
            addedByDoctor: Doctor;
            doctorId: ObjectId;
            doctor: Doctor;
            sessionId?: ObjectId;
            session: Session;
            serviceId: ObjectId;
            service: Service;
        }>,
    ) {
        if (args.addedByDoctor != null)
            this.addedByDoctor = new DoctorGraph(args.addedByDoctor);
        if (args.addedByDoctorId != null)
            this.addedByDoctorId = args.addedByDoctorId.toHexString();
        if (args.doctor != null) this.doctor = new DoctorGraph(args.doctor);
        if (args.doctorId != null) this.doctorId = args.doctorId.toHexString();
        if (args.service != null)
            this.service = new ServiceGraph({ ...args.service });
        if (args.serviceId != null)
            this.serviceId = args.serviceId.toHexString();
        if (args.session != null) this.session = new SessionGraph(args.session);
        if (args.sessionId != null)
            this.sessionId = args.sessionId.toHexString();
    }
}

@ObjectType()
export class AppointmentBlankGraph {
    @Field()
    _id: string;

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

    @Field(() => [AppointmentResultsGraph], { nullable: true })
    appointmentResults: AppointmentResultsGraph[];

    @Field(() => [AppointmentBlankOwnersGraph])
    owners: AppointmentBlankOwnersGraph[];

    constructor(
        args: Partial<
            Modify<
                AppointmentBlank,
                {
                    owners?: {
                        doctorId: ObjectId;
                        doctor?: Doctor;
                        sessionId?: ObjectId;
                        session?: Session;
                        serviceId: ObjectId;
                        service?: Service;
                    }[];
                }
            >
        >,
    ) {
        if (args._id != null) this._id = args._id.toHexString();
        if (args.appointmentResults != null)
            this.appointmentResults = args.appointmentResults.map(
                (val) =>
                    new AppointmentResultsGraph({
                        ...val,
                    }),
            );
        if (args.complaint != null)
            this.complaint = new ComplaintGraph({ ...args.complaint });
        if (args.diagnose != null)
            this.diagnose = new DiagnoseGraph({ ...args.diagnose });
        if (args.inspections != null)
            this.inspections = args.inspections.map(
                (val) => new InspectionsGraph({ ...val }),
            );
        if (args.owners != null)
            this.owners = args.owners.map(
                (val) => new AppointmentBlankOwnersGraph({ ...val }),
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
