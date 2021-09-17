import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
    CurrentUserGraph, PreAuthGuardUser,
} from 'src/modules/helpers/auth/auth.service';
import { User } from 'src/modules/user/model/user.interface';
import { CreateRating } from '../model/createRating.args';
import { RatingGraph } from '../model/rating.model';
import { RatingService } from '../service/rating.service';

@Resolver()
export class RatingResolver {
    constructor(private ratingService: RatingService) {}

    @Mutation(() => RatingGraph)
    @UseGuards(PreAuthGuardUser)
    async leaveRating(
        @Args() args: CreateRating,
        @CurrentUserGraph() user: User,
    ) {
        const rating = await this.ratingService.create({
            ...args,
            userId: user._id,
        });
        const ratingResponce = new RatingGraph({...rating});
        return ratingResponce;
    }
}
