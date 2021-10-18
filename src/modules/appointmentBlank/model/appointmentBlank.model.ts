import { Field, ObjectType } from '@nestjs/graphql';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { AppointmentResultsGraph } from './addictives/AppointmenResults.model';
import { ComplaintGraph } from './addictives/complaint.model';
import { DiagnoseGraph } from './addictives/diagnose.model';
import { AppointmentBlank } from './appointmentBlank.interface';

@ObjectType()
export class AppointmentBlankGraph
    implements
        Modify<
            Omit<AppointmentBlank, 'sessionId' | 'doctorId' | 'userId'>,
            {
                _id: string;
                complaints: ComplaintGraph;
                appointmentResults: AppointmentResultsGraph;
                diagnose: DiagnoseGraph;
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

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    constructor(
        appointmentBlank: Partial<AppointmentBlank> & {
            user?: User;
            doctor?: Doctor;
        },
    ) {
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
        if (appointmentBlank.doctor)
            this.doctor = new DoctorGraph({ ...appointmentBlank.doctor });
        if (appointmentBlank.user)
            this.user = new UserGraph({ ...appointmentBlank.user });
    }
}
