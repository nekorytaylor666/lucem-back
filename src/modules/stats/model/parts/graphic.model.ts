import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AllowedGraphTypes } from '../stats.interface';

@ObjectType()
export class StatsGraphicDatesGraph {
    @Field(() => Int, { nullable: true })
    year: number;

    @Field(() => Int)
    month: number;

    @Field(() => Int, { nullable: true })
    day: number;

    @Field(() => Int)
    sum: number;

    @Field(() => AllowedGraphTypes)
    type: AllowedGraphTypes;

    constructor(args: {
        year?: number;
        month?: number;
        day?: number;
        sum?: number;
        type?: AllowedGraphTypes;
    }) {
        if (args.year != null) this.year = args.year;
        if (args.month != null) this.month = args.month;
        if (args.day != null) this.day = args.day;
        if (args.sum != null) this.sum = args.sum;
        if (args.type != null) this.type = args.type;
    }
}
