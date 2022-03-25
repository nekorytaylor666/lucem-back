import { UseGuards } from '@nestjs/common';
import { Args, GraphQLISODateTime, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
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
    @Roles('admin', 'doctor', 'secretary')
    @UseGuards(PreAuthGuard)
    async getStatsOfDoctorByPeriodsOfTime(
        @Args('doctorId', { type: () => String, nullable: true })
        _doctorId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const doctorId =
            payload.role === TokenRoles.Doctor
                ? user._id
                : new ObjectId(_doctorId);
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
