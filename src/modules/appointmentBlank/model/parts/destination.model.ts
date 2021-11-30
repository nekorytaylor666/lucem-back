import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { AppointmentBlank } from '../appointmentBlank.model';

export interface Destination extends AppointmentBlank {
    _id: ObjectId;
    bookingId?: ObjectId;
    serviceId?: ObjectId;
    endDate?: Date;
}

@ObjectType()
export class DestinationGraph {
    @Field()
    _id: string;

    @Field(() => BookingGraph, { nullable: true })
    booking: BookingGraph;

    @Field(() => ServiceGraph, { nullable: true })
    service: ServiceGraph;

    @Field(() => GraphQLISODateTime, { nullable: true })
    endDate: Date;

    constructor(
        destination: Partial<Destination> & {
            booking?: Booking;
            service?: Service;
        },
    ) {
        if (destination._id != null) this._id = destination._id.toHexString();
        if (destination.endDate != null) this.endDate = destination.endDate;
        if (destination.booking != null)
            this.booking = new BookingGraph({ ...destination.booking });
        if (destination.service != null)
            this.service = new ServiceGraph({ ...destination.service });
    }
}
