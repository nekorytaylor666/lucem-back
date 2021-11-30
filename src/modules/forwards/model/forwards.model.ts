import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { Forwards } from './forwards.interface';

@ObjectType('Forwards')
export class ForwardsGraph
    implements
        Modify<
            Omit<Forwards, 'serviceIds' | 'doctorId' | 'userId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => [ServiceGraph])
    services: ServiceGraph[];

    @Field(() => DoctorGraph)
    doctor: DoctorGraph;

    @Field(() => GraphQLISODateTime)
    dateAdded: Date;

    @Field()
    user: UserGraph;

    constructor(
        forwards: Partial<Forwards> & {
            services?: Service[];
            user?: User;
            doctor?: Doctor;
        },
    ) {
        if (forwards._id != null) this._id = forwards._id.toHexString();
        if (forwards.dateAdded != null) this.dateAdded = forwards.dateAdded;
        if (forwards.doctor != null)
            this.doctor = new DoctorGraph({ ...forwards.doctor });
        if (forwards.services != null)
            this.services = forwards.services.map(
                (val) => new ServiceGraph({ ...val }),
            );
        if (forwards.user != null) this.user = new UserGraph({ ...forwards.user });
    }
}
