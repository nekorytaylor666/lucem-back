import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { Modify } from 'src/utils/modifyType';
import { SessionAddictive } from './session.addictive';
import { Session } from './session.interface';

@ObjectType('Session')
export class SessionGraph
    implements
        Modify<
            Omit<Session, 'bookingId' | 'serviceId' | 'userId' | 'doctorId'>,
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

    @Field(() => Int, { defaultValue: 1 })
    count: number;

    constructor(session: Partial<SessionAddictive>) {
        if (session._id) this._id = session._id.toHexString();
        if (session.booking)
            this.booking = new BookingGraph({
                ...session.booking,
                service: session.service,
                user: session.user,
                doctor: session.doctor,
            });
        if (session.startDate) this.startDate = session.startDate.toISOString();
        if (session.endDate) this.endDate = session.endDate.toISOString();
        if (session.count) this.count = session.count;
    }
}
