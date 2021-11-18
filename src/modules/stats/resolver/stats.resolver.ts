import { UseGuards } from '@nestjs/common';
import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { AllowedPeriodsOfTime } from '../model/stats.interface';
import { StatsGraph } from '../model/stats.model';
import { StatsService } from '../service/stats.service';

@Resolver()
export class StatsResolver {
    constructor(private statsService: StatsService) {}

    @Query(() => StatsGraph)
    @Roles('admin')
    @UseGuards(PreAuthGuard)
    async getGeneralStats(
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @Args('period', { type: () => AllowedPeriodsOfTime })
        period: AllowedPeriodsOfTime,
    ) {
        const stats = await this.statsService.getGeneralStatsByPeriodOfTime({
            firstDate,
            secondDate,
            period,
        });
        const statsResponce = new StatsGraph({ ...stats });
        return statsResponce;
    }

    @Query(() => StatsGraph)
    @Roles('admin')
    @UseGuards(PreAuthGuard)
    async getSpecStats(
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @Args('period', { type: () => AllowedPeriodsOfTime })
        period: AllowedPeriodsOfTime,
        @Args('specializationId', { type: () => String })
        specializationId: string,
    ) {
        const stats = await this.statsService.getSpecStatsByPeriodOfTime({
            firstDate,
            secondDate,
            specializationId: new ObjectId(specializationId),
            period,
        });
        const statsResponce = new StatsGraph({ ...stats });
        return statsResponce;
    }
}
