import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorGraph } from 'src/modules/doctor/model/doctor.model';
import { Service } from 'src/modules/service/model/service.interface';
import { ServiceGraph } from 'src/modules/service/model/service.model';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';
import { Booking, BookingProgress } from './booking.interface';

@ObjectType('Booking')
export class BookingGraph
    implements
        Modify<
            Omit<Booking, 'serviceId' | 'userId' | 'doctorId'>,
            {
                _id: string;
            }
        >
{
    @Field()
    _id: string;

    @Field({ nullable: true })
    service?: ServiceGraph;

    @Field()
    user: UserGraph;

    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;

    @Field(() => DoctorGraph, { nullable: true })
    doctor: DoctorGraph;

    @Field(() => BookingProgress)
    progress: BookingProgress;

    @Field()
    price: number;

    constructor(
        booking: Partial<
            Booking & {
                service: Service;
                user: User;
                doctor: Doctor;
            }
        >,
    ) {
        if (booking._id) this._id = booking._id.toHexString();
        if (booking.service)
            this.service = new ServiceGraph({ ...booking.service });
        if (booking.user) this.user = new UserGraph({ ...booking.user });
        if (booking.startDate) this.startDate = booking.startDate;
        if (booking.endDate) this.endDate = booking.endDate;
        if (booking.doctor)
            this.doctor = new DoctorGraph({ ...booking.doctor });
        if (booking.progress != null) this.progress = booking.progress;
        if (booking.price != null) this.price = booking.price;
    }
}
