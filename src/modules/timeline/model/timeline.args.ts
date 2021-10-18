import { ArgsType, Field, GraphQLISODateTime } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Timeline } from "./timeline.interface";


@ArgsType()
export class CreateTimeline implements Modify<Omit<Timeline, "_id">, {
    doctorId: string,
}> {
    @Field()
    doctorId: string;

    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;

    @Field(() => Boolean, { nullable: true })
    isVacation?: true;
}