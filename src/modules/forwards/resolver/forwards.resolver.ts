import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { User } from 'src/modules/user/model/user.interface';
import { paginate } from 'src/utils/paginate';
import { ForwardsGraph } from '../model/forwards.model';
import { ForwardsService } from '../service/forwards.service';

@Resolver()
export class ForwardsResolver {
    constructor(private forwardsService: ForwardsService) {}

    @Mutation(() => ForwardsGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async createForward(
        @Args('userId', { type: () => String }) userId: string,
        @Args('serviceIds', { type: () => [String] }) serviceIds: string[],
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const forwards = await this.forwardsService.create({
            userId,
            serviceIds,
            doctorId: doctor._id,
        });
        const forwardsResponce = new ForwardsGraph({ ...forwards });
        return forwardsResponce;
    }

    @Query(() => [ForwardsGraph])
    @Roles('user', 'doctor')
    @UseGuards(PreAuthGuard)
    async getUsersForwards(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: User,
        @CurrentTokenPayload() payload: Token,
    ) {
        const forwardsCursor =
            payload.role === TokenRoles.User
                ? this.forwardsService.findWithAddictivesCursor({
                      userId: new ObjectId(payload._id),
                  })
                : this.forwardsService.findWithAddictivesCursor({
                      userId: new ObjectId(userId),
                  });
        const forwards = await paginate({ cursor: forwardsCursor, page, elementsPerPage: 10 });
        const forwardsResponce = forwards.map((val) => new ForwardsGraph({...val}));
        return forwardsResponce;
    }
}
