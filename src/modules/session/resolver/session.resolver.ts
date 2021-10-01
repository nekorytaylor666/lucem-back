import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
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
        const sessionResponce = new SessionGraph({...session});
        return sessionResponce;
    }

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async endSession(
        @Args('sessionId', { type: () => String}) sessionId: string
    ) {
        const session = await this.sessionService.updateOne({
            findFields: ['_id'],
            findValues: [new ObjectId(sessionId)],
            updateFields: ['endDate'],
            updateValues: [new Date()],
            method: '$set'
        });
        const sessionResponce = new SessionGraph({...session});
        return sessionResponce;
    }

    @Query(() => SessionGraph)
    async getActiveSessionByUserId(
        @Args('userId', { type: () => String}) userId: string
    ) {
        const session = await this.sessionService.findActiveSession(userId);
        const sessionResponce = new SessionGraph({...session});
        return sessionResponce;
    };
}
