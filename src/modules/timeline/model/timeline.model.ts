import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { BookingGraph } from "src/modules/booking/model/booking.model";
import { DoctorGraph } from "src/modules/doctor/model/doctor.model";
import { Modify } from "src/utils/modifyType";
import { TimelineAddictive } from "./timeline.addictive";
import { Timeline } from "./timeline.interface";


@ObjectType('Timeline')
export class TimelineGraph implements Modify<Omit<Timeline, "doctorId">, {
    _id: string,
}>{
    @Field()
    _id: string;

    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;

    @Field(() => [BookingGraph],{ nullable: true })
    booking?: BookingGraph[];

    constructor(timeline: Partial<TimelineAddictive>) {
        if (timeline._id) this._id = timeline._id.toHexString();
        // if (timeline.doctorId) this.doctor = new DoctorGraph({...timeline.doctor});
        if (timeline.startDate) this.startDate = timeline.startDate;
        if (timeline.endDate) this.endDate = timeline.endDate;
        if (timeline.booking) this.booking = timeline.booking.map((val) => new BookingGraph({...val}));
    }
}
