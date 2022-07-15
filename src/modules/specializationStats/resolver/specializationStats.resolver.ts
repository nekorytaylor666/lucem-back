import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { SessionGraph } from 'src/modules/session/model/session.model';
import { SpecializationStatsGraph } from '../model/specializationStats.model';
import { GeneralDataIncomeService } from '../service/generalDataIncome.service';
import { SpecializationStatsService } from '../service/specializationStats.service';

@Resolver()
export class SpecializationStatsResolver {
    constructor(
        private specializationStats: SpecializationStatsService,
        private generalDataIncomeService: GeneralDataIncomeService,
    ) {}

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
    @Query(() => [SessionGraph])
    async getSessionByPeriodOfTime(
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
    ) {
        const sessions = await this.generalDataIncomeService.getSessionGeneral(
            firstDate,
            secondDate,
        );
        return sessions.map((e) => new SessionGraph(e));

        // sessions
    }
}
