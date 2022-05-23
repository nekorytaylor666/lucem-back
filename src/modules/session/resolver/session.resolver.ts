import { Session, UseGuards } from '@nestjs/common';
import {
    Args,
    GraphQLISODateTime,
    Int,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { paginate } from 'src/utils/paginate';
import { SessionGraph } from '../model/session.model';
import { SessionService } from '../service/session.service';

@Resolver()
export class SessionResolver {
    constructor(private sessionService: SessionService) {}

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async startSession(
        @Args('bookingId', { type: () => String }) bookingId: string,
    ) {
        const session = await this.sessionService.create(bookingId);
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async endSession(
        @Args('sessionId', { type: () => String }) sessionId: string,
    ) {
        const session = await this.sessionService.endSession(sessionId);
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }

    @Query(() => SessionGraph)
    async getActiveSessionByUserId(
        @Args('userId', { type: () => String }) userId: string,
    ) {
        const session = await this.sessionService.findActiveSession(userId);
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }

    @Query(() => [SessionGraph])
    async getHistoryOfSessions(
        @Args('page', { type: () => Int }) page: number,
    ) {
        const sessionCursor = this.sessionService.historyOfSessionsCursor();
        const sessions = await paginate({
            cursor: sessionCursor,
            page,
            elementsPerPage: 10,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin', 'user')
    @UseGuards(PreAuthGuard)
    async getSessionsOfUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.User
                ? this.sessionService.sessionsOfUserCursor(user._id)
                : this.sessionService.sessionsOfUserCursor(
                      new ObjectId(userId),
                  );
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 15,
        });
        return sessions;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getHistoryOfSessionsOfDoctor(
        @Args('doctorId', { nullable: true, type: () => String })
        doctorId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.Doctor
                ? this.sessionService.getSessionsOfDoctorCursor(user._id)
                : this.sessionService.getSessionsOfDoctorCursor(
                      new ObjectId(doctorId),
                  );
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 10,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getHistoryOfSessionsOfDoctorByPeriodsOfTime(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessions =
            payload.role === TokenRoles.Doctor
                ? await this.sessionService.getSessionsOfDoctorByPeriodsOfTimeCursor(
                      {
                          doctorId: user._id,
                          firstDate,
                          secondDate,
                      },
                  )
                : await this.sessionService.getSessionsOfDoctorByPeriodsOfTimeCursor(
                      {
                          doctorId: new ObjectId(doctorId),
                          firstDate,
                          secondDate,
                      },
                  );
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getDoctorsSessionsOfUser(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.Doctor
                ? this.sessionService.getSessionsByDoctorsAndUserCursor({
                      doctorId: user._id,
                      userId: new ObjectId(userId),
                  })
                : this.sessionService.getSessionsByDoctorsAndUserCursor({
                      doctorId: new ObjectId(doctorId),
                      userId: new ObjectId(userId),
                  });
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 15,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async addDoctorAndServiceToSession(
        @Args('serviceId', { type: () => String }) _serviceId: string,
        @Args('doctorId', { type: () => String }) _doctorId: string,
        @Args('sessionId', { type: () => String }) _sessionId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const [serviceId, doctorId, sessionId] = [
            new ObjectId(_serviceId),
            new ObjectId(_doctorId),
            new ObjectId(_sessionId),
        ];
        const session = await this.sessionService.updateOneWithOptions({
            findField: ['data', '_id'],
            findValue: [
                { $elemMatch: { doctorId: { $eq: doctor._id } } },
                sessionId,
            ],
            updateField: ['data'],
            updateValue: [{ doctorId, serviceId }],
            method: '$addToSet',
        });
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }
}
