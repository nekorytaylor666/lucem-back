import { UseGuards } from '@nestjs/common';
import { Args, GraphQLISODateTime, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { parseTime } from 'src/utils/parseTime';
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

    @Mutation(() => WorkTimeGraph)
    @Roles('admin')
    @UseGuards(PreAuthGuard)
    async editWorkTime(
        @Args('workTimeId', { type: () => String }) workTimeId: string,
        @Args('startTime', { type: () => GraphQLISODateTime }) startDate: Date,
        @Args('endTime', { type: () => GraphQLISODateTime }) endDate: Date,
    ) {
        const [startTime, endTime] = [parseTime(startDate), parseTime(endDate)];
        const workTime = await this.workTimeService.updateOne({
            find: { _id: new ObjectId(workTimeId) },
            update: { startTime, endTime },
            method: '$set',
        });
        const workTimeResponce = new WorkTimeGraph({ ...workTime });
        return workTimeResponce;
    }
}
