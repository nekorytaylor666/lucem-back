import { ArgsType, Field } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Timeline } from "./timeline.interface";


@ArgsType()
export class CreateTimeline implements Modify<Omit<Timeline, "_id">, {
    doctorId: string,
    startDate: string,
    endDate: string
}> {
    @Field()
    doctorId: string;

    @Field()
    startDate: string;

    @Field()
    endDate: string;
}