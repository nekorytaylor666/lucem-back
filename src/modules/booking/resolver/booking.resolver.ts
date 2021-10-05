import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/modules/helpers/auth/auth.roles";
import { CurrentUserGraph, PreAuthGuard } from "src/modules/helpers/auth/auth.service";
import { User } from "src/modules/user/model/user.interface";
import { paginate } from "src/utils/paginate";
import { BookingGraph } from "../model/booking.model";
import { CreateBooking } from "../model/createBooking.args";
import { BookingService } from "../service/booking.service";



@Resolver()
export class BookingResolver {
    constructor(private bookingService: BookingService) {}
    @Mutation(() => BookingGraph)
    @Roles('user')
    @UseGuards(PreAuthGuard)
    async createBooking(
        @Args() args: CreateBooking,
        @CurrentUserGraph() user: User) {
        const createBooking = await this.bookingService.create({...args, userId: user._id.toHexString()});
        const bookingResponce = new BookingGraph({...createBooking});
        return bookingResponce
    }

    @Query(() => [BookingGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getUpcomingBookings(
        @Args('page', { type: () => Int }) page: number
    ) {
        const currentDate = new Date();
        const bookingsCursor = await this.bookingService.findWithOptionsCursor({
            fields: ['startDate'],
            values: [{ $gt: currentDate }]
        });
        const bookings = await paginate({ cursor: bookingsCursor, page, elementsPerPage: 10 });
        const bookingsResponce = bookings.map((val) => new BookingGraph({...val}));
        return bookingsResponce;
    }
}