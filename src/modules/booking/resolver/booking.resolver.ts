import { UseGuards } from '@nestjs/common';
import {
    Args,
    GraphQLISODateTime,
    Int,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { User } from 'src/modules/user/model/user.interface';
import { paginate } from 'src/utils/paginate';
import { BookingGraph } from '../model/booking.model';
import { CreateBooking } from '../model/createBooking.args';
import { BookingService } from '../service/booking.service';
import { Token, TokenRoles } from '../../helpers/token/token.interface';
import { ObjectId } from 'mongodb';
import { BookingProgress } from '../model/booking.interface';

@Resolver()
export class BookingResolver {
    constructor(private bookingService: BookingService) {}
    @Mutation(() => BookingGraph)
    @Roles('user', 'doctor')
    @UseGuards(PreAuthGuard)
    async createBooking(
        @Args() args: CreateBooking,
        @CurrentUserGraph()
        user: User,
        @CurrentTokenPayload() payload: Token,
    ) {
        const createBooking =
            payload.role === TokenRoles.User
                ? await this.bookingService.create({
                      ...args,
                      userId: user._id.toHexString(),
                  })
                : await this.bookingService.create({
                      ...args,
                  });
        const bookingResponce = new BookingGraph({ ...createBooking });
        return bookingResponce;
    }

    @Query(() => [BookingGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getUpcomingBookings(@Args('page', { type: () => Int }) page: number) {
        const currentDate = new Date();
        const bookingsCursor =
            await this.bookingService.findWithAddictivesCursor({
                fields: ['startDate'],
                values: [{ $gt: currentDate }],
            });
        const bookings = await paginate({
            cursor: bookingsCursor,
            page,
            elementsPerPage: 10,
        });
        const bookingsResponce = bookings.map(
            (val) => new BookingGraph({ ...val }),
        );
        return bookingsResponce;
    }

    @Query(() => [BookingGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getBookingsByProgressStatus(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @Args('progressStatus', { type: () => BookingProgress })
        progressStatus: BookingProgress,
        @Args('page', { type: () => Int }) page: number,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const bookingsCursor =
            payload.role === TokenRoles.Doctor
                ? await this.bookingService.findWithOptionsCursor({
                      fields: ['doctorId', 'progress'],
                      values: [user._id, progressStatus],
                  })
                : await this.bookingService.findWithOptionsCursor({
                      fields: ['doctorId', 'progress'],
                      values: [new ObjectId(doctorId), progressStatus],
                  });
        const bookings = await paginate({
            cursor: bookingsCursor,
            page,
            elementsPerPage: 10,
        });
        const bookingsResponce = bookings.map(
            (val) => new BookingGraph({ ...val }),
        );
        return bookingsResponce;
    }

    @Query(() => [BookingGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getBookingsByDoctorIdAndDates(
        @Args('doctorId', { type: () => String, nullable: true })
        _doctorId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const doctorId = _doctorId ? new ObjectId(_doctorId) : user._id;
        const bookings = await this.bookingService
            .findWithAddictivesCursor({
                fields: ['doctorId', 'startDate'],
                values: [doctorId, { $gte: firstDate, $lte: secondDate }],
            })
            .toArray();
        console.log(bookings);
        const bookingsResponce = bookings.map(
            (val) => new BookingGraph({ ...val }),
        );
        return bookingsResponce;
    }
}
