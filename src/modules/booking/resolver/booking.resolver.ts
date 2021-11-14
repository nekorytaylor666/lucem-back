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
            this.bookingService.findUpcomingBookingsCursor(currentDate);
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
    async getUpcomingBookingsOfDoctor(
        @Args('doctorId', { type: () => String, nullable: true })
        _doctorId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const currentDate = new Date();
        const doctorId = new ObjectId(_doctorId);
        const bookings =
            payload.role === TokenRoles.Doctor
                ? await this.bookingService.findUpcomingBookingsOfDoctor({
                      currentDate,
                      doctorId: user._id,
                  })
                : await this.bookingService.findUpcomingBookingsOfDoctor({
                      currentDate,
                      doctorId,
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
                ? this.bookingService.findCursor({
                      doctorId: user._id,
                      progress: progressStatus,
                  })
                : this.bookingService.findCursor({
                      doctorId: new ObjectId(doctorId),
                      progress: progressStatus,
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
        const bookings =
            await this.bookingService.getBookingsByDoctorIdAndDates({
                doctorId,
                firstDate,
                secondDate,
            });
        const bookingsResponce = bookings.map(
            (val) => new BookingGraph({ ...val }),
        );
        return bookingsResponce;
    }
}
