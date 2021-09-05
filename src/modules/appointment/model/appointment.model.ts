import { Field, ObjectType } from '@nestjs/graphql';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { AppointmentAddictive } from './appointment.addictive';
import { Appointment } from './appointment.interface';

@ObjectType()
export class AppointmentGraph
    implements
        Modify<
            Omit<Appointment, 'serviceId' | 'userId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => ServiceGraph, { nullable: true })
    service: ServiceGraph;

    @Field()
    date: Date;

    @Field(() => UserGraph, { nullable: true })
    user: UserGraph;

    constructor(
        appointment: Partial<AppointmentAddictive>,
    ) {
        if (appointment._id) this._id = appointment._id.toHexString();
        if (appointment.service)
            this.service = new ServiceGraph({ ...appointment.service });
        if (appointment.date) this.date = appointment.date;
        if (appointment.userId)
            this.user = new UserGraph({ ...appointment.user });
    }
}
