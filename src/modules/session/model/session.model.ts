import { Field, ObjectType } from '@nestjs/graphql';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { SessionAddictive } from './session.addictive';
import { Session } from './session.interface';

@ObjectType('Session')
export class SessionGraph
    implements
        Modify<
            Omit<Session, 'bookingId'>,
            {
                _id: string;
                startDate: string;
                endDate: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => BookingGraph, { nullable: true })
    booking: BookingGraph;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    constructor(session: Partial<SessionAddictive>) {
        if (session._id) this._id = session._id.toHexString();
        if (session.booking)
            this.booking = new BookingGraph({ ...session.booking });
        if (session.startDate) this.startDate = session.startDate.toISOString();
        if (session.endDate) this.endDate = session.endDate.toISOString();
    }
}
