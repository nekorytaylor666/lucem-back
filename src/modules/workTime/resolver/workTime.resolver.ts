import { UseGuards } from '@nestjs/common';
import { Args, GraphQLISODateTime, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { WorkTimeDateInput } from '../model/workTime.input';
import { WorkTimeGraph } from '../model/workTime.model';
import { WorkTimeService } from '../service/workTime.service';

@Resolver()
export class WorkTimeResolver {
    constructor(private workTimeService: WorkTimeService) {}

    @Mutation(() => [WorkTimeGraph])
    // @Roles('admin')
    // @UseGuards(PreAuthGuard)
    async createWorkTimeForAWeek(
        @Args('dates', { type: () => [WorkTimeDateInput] })
        workTimeDates: WorkTimeDateInput[],
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const workingTimes = await this.workTimeService.create({
            dates: workTimeDates,
            doctorId,
        });
        const workingTimesResponce = workingTimes.map(
            (val) => new WorkTimeGraph({ ...val }),
        );
        return workingTimesResponce;
    }
}
