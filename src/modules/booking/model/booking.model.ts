import { Field, ObjectType } from "@nestjs/graphql";
import { ServiceGraph } from "src/modules/service/model/service.model";
import { TimelineGraph } from "src/modules/timeline/model/timeline.model";
import { UserGraph } from "src/modules/user/model/user.model";
import { Modify } from "src/utils/modifyType";
import { BookingAddictive } from "./booking.addictive";
import { Booking } from "./booking.interface";


@ObjectType('Booking')
export class BookingGraph implements Modify<Omit<Booking, "serviceId" | "userId" | "timelineId">, {
    _id: string;
}> {
    @Field()
    _id: string;

    @Field({ nullable: true })
    service?: ServiceGraph;

    @Field()
    user: UserGraph;

    @Field()
    timeline: TimelineGraph;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    constructor(booking: Partial<BookingAddictive>) {
        if (booking._id) this._id = booking._id.toHexString();
        if (booking.service) this.service = new ServiceGraph({...booking.service})
        if (booking.user) this.user = new UserGraph({...booking.user});
        if (booking.timeline) this.timeline = new TimelineGraph({...booking.timeline});
        if (booking.startDate) this.startDate = booking.startDate;
        if (booking.endDate) this.endDate = booking.endDate;
    }
}