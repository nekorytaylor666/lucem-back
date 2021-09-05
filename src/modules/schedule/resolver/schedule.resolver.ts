import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUserGraph, PreAuthGuardUser } from "src/modules/helpers/auth/auth.service";
import { User } from "src/modules/user/model/user.interface";
import { CreateSchedule } from "../model/createSchedule.args";
import { ScheduleGraph } from "../model/schedule.model";
import { ScheduleService } from "../service/schedule.service";


@Resolver()
export class ScheduleResolver {
    constructor(
        private scheduleService: ScheduleService
    ) {}

    @UseGuards(PreAuthGuardUser)
    @Mutation(() => ScheduleGraph)
    async createAScheduleForOneDay(
        @Args() args: CreateSchedule,
        @CurrentUserGraph() user: User
    ) {
        const insertSchedule = await this.scheduleService.create({ ...args, userId: user._id })
        const scheduleResponce = new ScheduleGraph({...insertSchedule, appointments: [insertSchedule.appointment]});
        return scheduleResponce;
    }
}