import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { SpecializationStatsGraph } from '../model/specializationStats.model';
import { SpecializationStatsService } from '../service/specializationStats.service';

@Resolver()
export class SpecializationStatsResolver {
    constructor(private specializationStats: SpecializationStatsService) {}

    @Query(() => [SpecializationStatsGraph])
    async getSpecializationStatsByPeriodOfTime(
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
    ) {
        const stats =
            await this.specializationStats.getSpecializationStatsByPeriodOfTime(
                {
                    firstDate,
                    secondDate,
                },
            );
        const statsResponce = stats.map(
            (val) => new SpecializationStatsGraph({ ...val }),
        );
        return statsResponce;
    }
}
