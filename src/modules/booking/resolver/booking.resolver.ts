import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUserGraph, PreAuthGuardUser } from "src/modules/helpers/auth/auth.service";
import { User } from "src/modules/user/model/user.interface";
import { BookingGraph } from "../model/booking.model";
import { CreateBooking } from "../model/createBooking.args";
import { BookingService } from "../service/booking.service";



@Resolver()
export class BookingResolver {
    constructor(private bookingService: BookingService) {}

    @Mutation(() => BookingGraph)
    @UseGuards(PreAuthGuardUser)
    async createBooking(
        @Args() args: CreateBooking,
        @CurrentUserGraph() user: User) {
        const createBooking = await this.bookingService.create({...args, userId: user._id.toHexString()});
        const bookingResponce = new BookingGraph({...createBooking});
        return bookingResponce
    }
}