import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentUserGraph, PreAuthGuard,

} from 'src/modules/helpers/auth/auth.service';
import { User } from 'src/modules/user/model/user.interface';
import { paginate } from 'src/utils/paginate';
import { CreateRating } from '../model/createRating.args';
import { RatingGraph } from '../model/rating.model';
import { RatingService } from '../service/rating.service';

@Resolver()
export class RatingResolver {
    constructor(private ratingService: RatingService) {}

    @Mutation(() => RatingGraph)
    @Roles('user')
    @UseGuards(PreAuthGuard)
    async leaveRating(
        @Args() args: CreateRating,
        @CurrentUserGraph() user: User,
    ) {
        const rating = await this.ratingService.create({
            ...args,
            userId: user._id,
        });
        const ratingResponce = new RatingGraph({ ...rating });
        return ratingResponce;
    }

    @Query(() => [RatingGraph])
    async getRatingsByDoctorId(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('page', { type: () => Int }) page: number,
    ) {
        const ratingCursor = this.ratingService.findCursorWithAddictive({
            findFields: ['doctorId'],
            findValues: [new ObjectId(doctorId)]
        });
        const ratings = await paginate({
            cursor: ratingCursor,
            page,
            elementsPerPage: 10,
        });
        const ratingResponce = ratings.map((val) => new RatingGraph({...val}));
        return ratingResponce;
    }
}
