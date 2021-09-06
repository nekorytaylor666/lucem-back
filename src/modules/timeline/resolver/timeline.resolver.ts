import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTimeline } from "../model/timeline.args";
import { TimelineGraph } from "../model/timeline.model";
import { TimelineService } from "../service/timeline.service";



@Resolver()
export class TimelineResolver {
    constructor(private timelineService: TimelineService) {}

    @Mutation(() => TimelineGraph)
    async createTimeline(@Args() args: CreateTimeline) {
        const createTimeline = await this.timelineService.create(args);
        const timelineResponce = new TimelineGraph({...createTimeline});
        return timelineResponce;
    }

    @Query(() => TimelineGraph)
    async getTimelineByDoctorId(@Args('doctorId', { type: () => String}) doctorId: string) {
        
    }
}