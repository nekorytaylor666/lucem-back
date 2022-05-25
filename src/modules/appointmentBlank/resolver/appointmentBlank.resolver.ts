import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { ObjectId } from 'mongodb';

import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { SessionService } from 'src/modules/session/service/session.service';
import { paginate } from 'src/utils/paginate';
import { AppointmentBlankGraph } from '../model/appointmentBlank.model';
import { CreateAppointmentBlank } from '../model/createAppointmentBlank.args';
import { EditAppointmentBlank } from '../model/editAppointmentBlank.args';
import { AppointmentBlankService } from '../service/appointmentBlank.service';

@Resolver()
export class AppointmentBlankResolver {
    constructor(
        private appointmentBlankService: AppointmentBlankService,
        private sessionService: SessionService,
    ) {}

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: CreateAppointmentBlank,
    ) {
        const session = await this.sessionService.findOne({
            doctorId: doctor._id,
            _id: new ObjectId(args.sessionId),
        });
        const appointmentBlank = await this.appointmentBlankService.create({
            ...args,
            req,
            session,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Mutation(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editSessionBlank(
        @CurrentUserGraph() doctor: Doctor,
        @CurrentRequestURLGraph() req: string,
        @Args() args: EditAppointmentBlank,
    ) {
        const session = await this.sessionService.findOne({
            doctorId: doctor._id,
        });
        if (!session) throw new ApolloError('this is not your session');
        const appointmentBlank = await this.appointmentBlankService.edit({
            ...args,
            req,
            doctorId: doctor._id,
        });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Query(() => AppointmentBlankGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async addDoctorToAppointmentBlank(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('appointmentBlankId', { type: () => String })
        appointmentBlankId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentBlank =
            await this.appointmentBlankService.updateOneWithOptions({
                findField: ['_id', 'owners'],
                findValue: [
                    new ObjectId(appointmentBlankId),
                    { $elemMatch: { doctorId: { $eq: doctor._id } } },
                ],
                updateField: ['owners'],
                updateValue: [{ doctorId: new ObjectId(doctorId) }],
                method: '$addToSet',
            });
        const appointmentBlankResponce = new AppointmentBlankGraph({
            ...appointmentBlank,
        });
        return appointmentBlankResponce;
    }

    @Query(() => [AppointmentBlankGraph])
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async getAppointmentBlanksOfUser(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentBlanksCursor =
            this.appointmentBlankService.findWithAddictivesCursor({
                matchQuery: {
                    userId: new ObjectId(userId),
                    owners: {
                        $elemMatch: {
                            doctorId: {
                                $eq: doctor._id,
                            },
                        },
                    },
                },
                lookups: this.appointmentBlankService.basicLookups,
                sort: { dateCreated: -1 },
            });
        const appointmentBlanks = await paginate({
            cursor: appointmentBlanksCursor,
            page,
            elementsPerPage: 10,
        });
        const appointmentBlanksResponce = appointmentBlanks.map(
            (val) => new AppointmentBlankGraph({ ...val }),
        );
        return appointmentBlanksResponce;
    }
}
