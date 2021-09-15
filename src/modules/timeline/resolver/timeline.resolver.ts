import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { CurrentUserGraph, PreAuthGuardDoctor, PreAuthGuardUser } from 'src/modules/helpers/auth/auth.service';
import { paginate } from 'src/utils/paginate';
import { CreateTimeline } from '../model/timeline.args';
import { TimelineGraph } from '../model/timeline.model';
import { TimelineService } from '../service/timeline.service';

@Resolver()
export class TimelineResolver {
    constructor(private timelineService: TimelineService) {}

    @Mutation(() => TimelineGraph)
    async createTimeline(@Args() args: CreateTimeline) {
        const createTimeline = await this.timelineService.create(args);
        const timelineResponce = new TimelineGraph({ ...createTimeline });
        return timelineResponce;
    }

    @Query(() => [TimelineGraph])
    // @UseGuards(PreAuthGuardUser)
    async getTimelinesByDoctorId(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('page', { type: () => Int }) page: number,
    ) {
        const timelineCursor =
            await this.timelineService.findCursorWithAddictives({
                doctorId: new ObjectId(doctorId),
            });
        const timelines = await paginate({
            cursor: timelineCursor,
            page,
            elementsPerPage: 5,
        });
        const timelineResponce = timelines.map(
            (val) => new TimelineGraph({ ...val }),
        );
        return timelineResponce;
    }

    @Query(() => [TimelineGraph])
    @UseGuards(PreAuthGuardDoctor)
    async getTimelinesDoctor(
        @CurrentUserGraph() doctor: Doctor,
        @Args('page', { type: () => Int}) page: number
    ) {
        const timelineCursor = await this.timelineService.findCursorWithAddictives({doctorId: doctor._id }); 
        const timeline = await paginate({ cursor: timelineCursor, page, elementsPerPage: 10 });
        const timelineResponce = timeline.map((val) => new TimelineGraph({...val}));
        return timelineResponce;
    }
}