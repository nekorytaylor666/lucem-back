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
import { Booking, BookingProgress } from '../model/booking.interface';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { Service } from 'src/modules/service/model/service.interface';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { UserService } from 'src/modules/user/service/user.service';
import { ServiceService } from 'src/modules/service/service/service.service';
import { NotificationService } from 'src/modules/notification/service/notification.service';

@Resolver()
export class BookingResolver {
    constructor(
        private bookingService: BookingService,
        private doctorService: DoctorService,
        private userService: UserService,
        private serviceService: ServiceService,
        private notificationService: NotificationService,
    ) {}

    @Mutation(() => BookingGraph)
    @Roles('user', 'doctor')
    @UseGuards(PreAuthGuard)
    async createBooking(
        @Args() args: CreateBooking,
        @CurrentUserGraph()
        _user: User,
        @CurrentTokenPayload() payload: Token,
    ) {
        const doctor = await this.doctorService.findOne({
            _id: new ObjectId(args.doctorId),
        });
        const service = await this.serviceService.findOne({
            _id: new ObjectId(args.serviceId),
        });
        const createBooking =
            payload.role === TokenRoles.User
                ? await this.bookingService.create({
                      ...args,
                      doctor,
                      userId: _user._id.toHexString(),
                      service,
                  })
                : await this.bookingService.create({
                      ...args,
                      doctor,
                      service,
                  });
        const bookingResponce = new BookingGraph({ ...createBooking });
        const user = await this.userService.findOne({
            _id: createBooking.userId,
        });
        this.notificationService.setMailNotification({
            user,
            service,
            booking: createBooking,
            dateToSend: createBooking.startDate,
            currentDate: new Date(),
            doctor,
        });
        this.notificationService.calendarNotification({
            user,
            service,
            booking: createBooking,
            doctor,
        });
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

    @Query(() => [BookingGraph])
    @Roles('admin', 'doctor')
    @UseGuards(PreAuthGuard)
    async getUpcomingBookingsOfUser(
        @Args('userId', { type: () => String }) userId: string,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const bookings =
            payload.role === TokenRoles.User
                ? await this.bookingService
                      .findWithAddictivesCursor<
                          Booking & {
                              user: User;
                              service: Service;
                              doctor: Doctor;
                          }
                      >({
                          find: {
                              userId: user._id,
                              progress: BookingProgress.Upcoming,
                          },
                          lookups: this.bookingService.basicLookups,
                          sort: { startDate: 1 },
                      })
                      .toArray()
                : await this.bookingService
                      .findWithAddictivesCursor<
                          Booking & {
                              user: User;
                              service: Service;
                              doctor: Doctor;
                          }
                      >({
                          find: {
                              userId: new ObjectId(userId),
                              progress: BookingProgress.Upcoming,
                          },
                          lookups: this.bookingService.basicLookups,
                          sort: { startDate: 1 },
                      })
                      .toArray();
        const bookingsRespononce = bookings.map(
            (val) => new BookingGraph({ ...val }),
        );
        return bookingsRespononce;
    }

    @Query(() => [BookingGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getBookingsOfUser(
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ): Promise<BookingGraph[]> {
        const bookingsCursor =
            payload.role === TokenRoles.User
                ? this.bookingService.findWithAddictivesCursor<
                      Booking & {
                          user: User;
                          service: Service;
                          doctor: Doctor;
                      }
                  >({
                      find: {
                          userId: user._id,
                      },
                      lookups: this.bookingService.basicLookups,
                      sort: { startDate: -1 },
                  })
                : this.bookingService.findWithAddictivesCursor<
                      Booking & {
                          user: User;
                          service: Service;
                          doctor: Doctor;
                      }
                  >({
                      find: {
                          userId: new ObjectId(userId),
                      },
                      lookups: this.bookingService.basicLookups,
                      sort: { startDate: -1 },
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
}
