import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Mutation()
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async endSession(
        @Args('sessionId', { type: () => String}) sessionId: string
    ) {
        
    }
}
