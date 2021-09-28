import { ArgsType, Field } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Booking } from "./booking.interface";


@ArgsType()
export class CreateBooking implements Modify<Omit<Booking, "_id" | "userId">, {
    serviceId?: string,
    timelineId: string,
    startDate: string,
    endDate: string,
    doctorId: string
}> {
    @Field({ nullable: true })
    serviceId?: string;

    @Field()
    timelineId: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;

    @Field()
    doctorId: string
}