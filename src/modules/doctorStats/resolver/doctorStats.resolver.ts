import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { DoctorStatsGraph } from '../model/doctorStats.model';
import { DoctorStatsService } from '../service/doctorStats.service';

@Resolver()
export class DoctorStatsResolver {
    constructor(private doctorStatsService: DoctorStatsService) {}

    @Query(() => [DoctorStatsGraph])
    async getStatsOfDoctorsByPeriodOfTimeAndSpecialization(
        @Args('specializationId', { type: () => String })
        specializationId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
    ) {
        const stats =
            await this.doctorStatsService.getStatsOfDoctorsByPeriodOfTime({
                firstDate,
                secondDate,
                specializationId: new ObjectId(specializationId),
            });
        const statsResponce = stats.map(
            (val) => new DoctorStatsGraph({ ...val }),
        );
        return statsResponce;
    }
}
