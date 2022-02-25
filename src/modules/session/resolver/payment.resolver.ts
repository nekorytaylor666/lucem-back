import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { paginate } from 'src/utils/paginate';
import { SessionGraph } from '../model/session.model';
import { SessionService } from '../service/session.service';

@Resolver()
export class SessionPaymentResolver {
    constructor(private sessionService: SessionService) {}

    @Query(() => [SessionGraph])
    @Roles('secretary')
    @UseGuards(PreAuthGuard)
    async getUnpayedSessions(@Args('page', { type: () => Int }) page: number) {
        const sessionsCursor = this.sessionService.findWithAddictivesCursor({
            matchQuery: {
                isPayed: {
                    $exists: false,
                },
            },
            lookups: this.sessionService.basicLookups,
            sort: {
                endDate: -1,
            },
        });
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 10,
        });
        return sessions;
    }

    @Mutation(() => Boolean)
    @Roles('secretary')
    @UseGuards(PreAuthGuard)
    async changeStatusToPayedSessions(
        @Args('sessionIds', { type: () => [String] }) _sessionIds: string[],
    ) {
        const sessionIds = _sessionIds.map((val) => new ObjectId(val));
        const payedSessionsResponce =
            await this.sessionService.updateManyWithOptions({
                findField: ['_id'],
                findValue: [{ $in: sessionIds }],
                updateField: ['isPayed'],
                updateValue: [true],
                method: '$set',
            });
        if (!payedSessionsResponce) throw new ApolloError('sessions not found');
        return payedSessionsResponce;
    }
}
