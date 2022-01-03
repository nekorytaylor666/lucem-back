import { UseGuards } from '@nestjs/common';
import {
    Args,
    GraphQLISODateTime,
    Int,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { Cron, Interval } from '@nestjs/schedule';
import * as moment from 'moment';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { WorkTimeService } from 'src/modules/workTime/service/workTime.service';
import { paginate } from 'src/utils/paginate';
import { parseTime } from 'src/utils/parseTime';
import { CreateTimeline } from '../model/timeline.args';
import { Timeline } from '../model/timeline.interface';
import { TimelineGraph } from '../model/timeline.model';
import { TimelineService } from '../service/timeline.service';

@Resolver()
export class TimelineResolver {
    constructor(
        private timelineService: TimelineService,
        private doctorService: DoctorService,
        private workTimeService: WorkTimeService,
    ) {}

    @Mutation(() => TimelineGraph)
    async createTimeline(@Args() args: CreateTimeline) {
        const createTimeline = await this.timelineService.create(args);
        const timelineResponce = new TimelineGraph({ ...createTimeline });
        return timelineResponce;
    }

    @Mutation(() => String)
    async createTimeLineWeek() {
        const doctors = await this.doctorService.list();
        await Promise.all(
            doctors.map(async (val) => {
                for (let ind = 0; ind < 14; ind++) {
                    let startDate = moment(
                        new Date('2021-09-27T09:00:00.000Z'),
                    ).toDate();
                    let endDate = moment(
                        new Date('2021-09-27T18:00:00.000Z'),
                    ).toDate();
                    if (ind) {
                        startDate = moment(new Date('2021-09-27T09:00:00.000Z'))
                            .add(ind, 'day')
                            .toDate();
                        endDate = moment(new Date('2021-09-27T18:00:00.000Z'))
                            .add(ind, 'day')
                            .toDate();
                    }
                    await this.timelineService.create({
                        doctorId: val._id.toHexString(),
                        startDate,
                        endDate,
                    });
                }
            }),
        );
        return 'bitch';
    }

    // @Cron('0 0 1 * *')
    // async createTimeLineForAMonth() {
    //     const doctors = await this.doctorService.list();
    //     const currentDate = new Date();
    //     const currentDay = currentDate.getDay();
    //     const currentMonth = currentDate.getMonth();
    //     await Promise.all(
    //         doctors.map(async (doctor) => {
    //             const workTimes = await this.workTimeService.find({
    //                 doctorId: doctor._id,
    //             });
    //             const workTimesDays = workTimes.map((val) => {
    //                 return { workTime: val, day: val.startTime.getDay };
    //             });
    //             const
    //         }),
    //     );
    // }

    @Interval(1000 * 60 * 60 * 24 * 30)
    @Query(() => String)
    async setTimeLines() {
        const doctors = await this.doctorService.list();
        await Promise.all(
            doctors.map(async (val) => {
                const workTimes = await this.workTimeService.find({
                    doctorId: val._id,
                });
                for (let i = 1; i < 31; i++) {
                    const currentDate = moment(new Date())
                        .add(i, 'days')
                        .toDate();
                    const parsedDate = parseTime(currentDate);
                    const currentWorkTime = workTimes.find(
                        (val) => val.startTime.getDay() === parsedDate.getDay(),
                    );
                    if (!currentWorkTime) continue;
                    const startDate = new Date(
                        moment(currentDate)
                            .set({
                                hours:
                                    currentWorkTime.startTime.getUTCHours() + 6,
                                minutes:
                                    currentWorkTime.startTime.getUTCMinutes(),
                                seconds:
                                    currentWorkTime.startTime.getUTCSeconds(),
                            })
                            .format(),
                    );
                    const endDate = new Date(
                        moment(currentDate)
                            .set({
                                hours:
                                    currentWorkTime.endTime.getUTCHours() + 6,
                                minutes:
                                    currentWorkTime.endTime.getUTCMinutes(),
                                seconds:
                                    currentWorkTime.endTime.getUTCSeconds(),
                            })
                            .format(),
                    );
                    const checkTimeLine =
                        await this.timelineService.findOneWithOptions({
                            fields: ['startDate', 'endDate', 'doctorId'],
                            values: [
                                { $lte: startDate },
                                { $gte: endDate },
                                val._id,
                            ],
                        });
                    if (checkTimeLine) continue;
                    const timeLine: Timeline = {
                        doctorId: val._id,
                        startDate,
                        endDate,
                    };
                    await this.timelineService.insertOne(timeLine);
                }
            }),
        );
        return 'ready';
    }

    // @Query(() => String)
    // async timelineUpdatingSystem() {
    //     try {
    //         await this.timelineService.setTimeLines();
    //     } catch (e) {
    //         throw e;
    //     }
    //     return 'success';
    // }

    @Query(() => [TimelineGraph])
    async getTimelinesByDoctorId(
        @Args('doctorId', { type: () => String }) doctorId: string,
    ) {
        const timelineCursor =
            await this.timelineService.findCursorWithAddictives({
                doctorId: new ObjectId(doctorId),
            });
        const timelines = await timelineCursor.toArray();
        const timelineResponce = timelines.map(
            (val) => new TimelineGraph({ ...val }),
        );
        return timelineResponce;
    }

    @Mutation(() => TimelineGraph)
    async setVacation(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('endDate', { type: () => GraphQLISODateTime }) endDate: Date,
        @Args('startDate', { type: () => GraphQLISODateTime }) startDate: Date,
    ) {
        const vacation = await this.timelineService.create({
            endDate,
            startDate,
            doctorId,
            isVacation: true,
        });
        const vacationResponce = new TimelineGraph({ ...vacation });
        return vacationResponce;
    }

    @Query(() => [TimelineGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async getTimelinesDoctor(
        @CurrentUserGraph() doctor: Doctor,
        @Args('page', { type: () => Int }) page: number,
    ) {
        const timelineCursor =
            await this.timelineService.findCursorWithAddictives({
                doctorId: doctor._id,
            });
        const timeline = await paginate({
            cursor: timelineCursor,
            page,
            elementsPerPage: 10,
        });
        const timelineResponce = timeline.map(
            (val) => new TimelineGraph({ ...val }),
        );
        return timelineResponce;
    }
}
