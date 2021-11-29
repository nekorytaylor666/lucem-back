import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { DoctorSpecStatsGraph } from '../model/doctorStats.model';
import { DoctorStatsService } from '../service/doctorStats.service';

@Resolver()
export class DoctorStatsResolver {
    constructor(private doctorStatsService: DoctorStatsService) {}

    @Query(() => [DoctorSpecStatsGraph])
    async getStatsOfDoctorsByPeriodOfTimeAndSpecialization(
        @Args('specializationId', { type: () => String })
        specializationId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
    ) {
        const stats =
            await this.doctorStatsService.getStatsOfDoctorsByPeriodOfTimeAndSpec(
                {
                    firstDate,
                    secondDate,
                    specializationId: new ObjectId(specializationId),
                },
            );
        const statsResponce = stats.map(
            (val) => new DoctorSpecStatsGraph({ ...val }),
        );
        return statsResponce;
    }

    @Query(() => DoctorSpecStatsGraph)
    async getStatsOfDoctorByPeriodsOfTime(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
    ) {
        const stats =
            await this.doctorStatsService.getStatsOfDoctorByPeriodsOfTime({
                doctorId: new ObjectId(doctorId),
                firstDate,
                secondDate,
            });
        const statsReponce = new DoctorSpecStatsGraph({ ...stats });
        return statsReponce;
    }
}
