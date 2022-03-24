import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server-errors';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentRequestURLGraph,
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import {
    AppointmentResults,
    AppointmentResultsGraph,
} from '../../model/parts/AppointmenResults.model';
import { AppointmenResultsService } from '../../service/utils/appointmentResult.service';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Session } from 'src/modules/session/model/session.interface';
import { User } from 'src/modules/user/model/user.interface';

@Resolver()
export class AppointmenResultsResolver {
    constructor(private appointmentResultsService: AppointmenResultsService) {}

    @Query(() => [AppointmentResultsGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getAppointmentResultsByDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const appointmentResults =
            payload.role === TokenRoles.Doctor
                ? await this.appointmentResultsService
                      .findWithAddictivesCursor<
                          AppointmentResultsGraph & {
                              doctor?: Doctor;
                              user?: User;
                              session?: Session;
                          }
                      >({
                          find: { doctorId: user._id },
                          lookups: this.appointmentResultsService.basicLookups,
                      })
                      .toArray()
                : await this.appointmentResultsService
                      .findWithAddictivesCursor<
                          AppointmentResults & {
                              doctor?: Doctor;
                              user?: User;
                              session?: Session;
                          }
                      >({
                          find: { doctorId: new ObjectId(doctorId) },
                          lookups: this.appointmentResultsService.basicLookups,
                      })
                      .toArray();
        const appointmentResultsResponce = appointmentResults.map(
            (val) => new AppointmentResultsGraph({ ...val }),
        );
        return appointmentResultsResponce;
    }

    @Query(() => [AppointmentResultsGraph])
    @Roles('doctor', 'admin', 'user')
    @UseGuards(PreAuthGuard)
    async getAppointmentResultsByUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const appointmentResults =
            payload.role === TokenRoles.User
                ? await this.appointmentResultsService
                      .findWithAddictivesCursor<
                          AppointmentResults & {
                              doctor?: Doctor;
                              user?: User;
                              session?: Session;
                          }
                      >({
                          find: { userId: user._id },
                          lookups: this.appointmentResultsService.basicLookups,
                      })
                      .toArray()
                : await this.appointmentResultsService
                      .findWithAddictivesCursor<
                          AppointmentResults & {
                              doctor?: Doctor;
                              user?: User;
                              session?: Session;
                          }
                      >({
                          find: { userId: new ObjectId(userId) },
                          lookups: this.appointmentResultsService.basicLookups,
                      })
                      .toArray();
        const appointmentResultsResponce = appointmentResults.map(
            (val) => new AppointmentResultsGraph({ ...val }),
        );
        return appointmentResultsResponce;
    }

    @Query(() => AppointmentResultsGraph)
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async getAppointmentResultById(
        @Args('appointmentResultId', { type: () => String })
        appointmentResultId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const appointmentResult = await this.appointmentResultsService.findOne({
            _id: new ObjectId(appointmentResultId),
        });
        if (
            payload.role === TokenRoles.User &&
            appointmentResult.userId.toHexString() !== user._id.toHexString()
        )
            throw new ApolloError('this is not your appointment results');
        const appointmentResultsResponce = new AppointmentResultsGraph({
            ...appointmentResult,
        });
        return appointmentResultsResponce;
    }

    @Mutation(() => AppointmentResultsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async uploadAppointmentResults(
        @Args('image', { type: () => GraphQLUpload })
        image: Promise<FileUpload>,
        @Args('userId', { type: () => String }) userId: string,
        @Args('description', { type: () => String }) description: string,
        @CurrentRequestURLGraph() req: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentResults = await this.appointmentResultsService.create({
            image: await image,
            description,
            doctorId: doctor._id,
            req,
            userId: new ObjectId(userId),
        });
        const appointmentResultsResponce = new AppointmentResultsGraph({
            ...appointmentResults,
        });
        return appointmentResultsResponce;
    }

    @Mutation(() => AppointmentResultsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async editAppointmentResults(
        @Args('image', { type: () => GraphQLUpload, nullable: true })
        image: Promise<FileUpload>,
        @Args('description', { type: () => String, nullable: true })
        description: string,
        @Args('appointmentResultId', { type: () => String, nullable: true })
        appointmentResultId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const appointmentResults = await this.appointmentResultsService.edit({
            image,
            description,
            doctorId: doctor._id,
            appointmentResultId: new ObjectId(appointmentResultId),
        });
        const appointmentResultsResponce = new AppointmentResultsGraph({
            ...appointmentResults,
        });
        return appointmentResultsResponce;
    }
}
