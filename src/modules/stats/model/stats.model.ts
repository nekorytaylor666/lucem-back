import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { StatsGraphicDatesGraph } from './parts/graphic.model';
import { Stats } from './stats.interface';

@ObjectType()
export class StatsGraph
    implements
        Modify<
            Stats,
            {
                data: StatsGraphicDatesGraph[];
            }
        >
{
    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;

    @Field(() => Int, { defaultValue: 0 })
    totalMoneyEarnt: number;

    @Field(() => Int, { defaultValue: 0 })
    totalIndividualPatients: number;

    @Field(() => Int, { defaultValue: 0 })
    totalSessionSum: number;

    @Field(() => [StatsGraphicDatesGraph])
    data: StatsGraphicDatesGraph[];

    constructor(stats: Partial<Stats>) {
        if (stats.startDate) this.startDate = stats.startDate;
        if (stats.endDate) this.endDate = stats.endDate;
        if (stats.totalMoneyEarnt) this.totalMoneyEarnt = stats.totalMoneyEarnt;
        if (stats.totalIndividualPatients)
            this.totalIndividualPatients = stats.totalIndividualPatients;
        if (stats.totalSessionSum) this.totalSessionSum = stats.totalSessionSum;
        if (stats.data)
            this.data = stats.data.map(
                (val) => new StatsGraphicDatesGraph({ ...val }),
            );
    }
}
