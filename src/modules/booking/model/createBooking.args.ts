import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Booking } from './booking.interface';

@ArgsType()
export class CreateBooking
    implements
        Modify<
            Omit<Booking, '_id' | 'userId' | 'progress'>,
            {
                serviceId?: string;
                timelineId: string;
                doctorId: string;
            }
        >
{
    @Field({ nullable: true })
    serviceId?: string;

    @Field()
    timelineId: string;

    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;

    @Field()
    doctorId: string;

    @Field({ nullable: true })
    userId: string;
}
