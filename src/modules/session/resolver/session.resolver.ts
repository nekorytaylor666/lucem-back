import { UseGuards } from '@nestjs/common';
import {
    Args,
    GraphQLISODateTime,
    Int,
    Mutation,
    Query,
    Resolver,
} from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { AppointmentBlankService } from 'src/modules/appointmentBlank/service/appointmentBlank.service';
import { BookingProgress } from 'src/modules/booking/model/booking.interface';
import { BookingService } from 'src/modules/booking/service/booking.service';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentTokenPayload,
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { CalendarService } from 'src/modules/helpers/calendar/service/calendar.service';
import { Token, TokenRoles } from 'src/modules/helpers/token/token.interface';
import { paginate } from 'src/utils/paginate';
import { SessionGraph } from '../model/session.model';
import { SessionService } from '../service/session.service';
import * as moment from 'moment';
import { MailService } from 'src/modules/helpers/mailgun/mailgun.service';
import { ServiceService } from 'src/modules/service/service/service.service';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';

@Resolver()
export class SessionResolver {
    constructor(
        private sessionService: SessionService,
        private bookingService: BookingService,
        private serviceService: ServiceService,
        private doctorService: DoctorService,
        private appointmentBlankService: AppointmentBlankService,
        private calendarSer: CalendarService,
        private mailService: MailService,
    ) {}

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async startSession(
        @Args('bookingId', { type: () => String, nullable: true })
        bookingId: string,
        @Args('appointmentBlankId', { type: () => String, nullable: true })
        appointmentBlankId: string,
        @CurrentUserGraph() doctor: Doctor,
    ) {
        const booking =
            bookingId &&
            (await this.bookingService.findOne({
                _id: new ObjectId(bookingId),
                doctorId: doctor._id,
            }));
        const appointmentBlank =
            await this.appointmentBlankService.findOneWithOptions({
                fields: ['owners', '_id'],
                values: [
                    {
                        $elemMatch: {
                            doctorId: { $eq: doctor._id },
                        },
                    },
                    new ObjectId(appointmentBlankId),
                ],
            });
        let price;
        if (booking != null) {
            price = (
                await this.serviceService.findOne({
                    _id: appointmentBlank.owners.find(
                        (val) =>
                            doctor._id.toHexString() ===
                            val.doctorId.toHexString(),
                    ).serviceId,
                })
            ).price;
            appointmentBlank.owners.find(
                (val) =>
                    doctor._id.toHexString() === val.doctorId.toHexString(),
            ).serviceId;
        } else {
            price = booking.price;
        }

        const session = booking
            ? await this.sessionService.create({
                  serviceId: booking.serviceId,
                  doctorId: booking.doctorId,
                  userId: booking.userId,
                  bookingId: booking._id,
                  price,
                  clinicPercnetage: 100 - (doctor.doctorPercentage ?? 50),
              })
            : await this.sessionService.create({
                  userId: appointmentBlank.userId,
                  doctorId: doctor._id,
                  serviceId: appointmentBlank.owners.find(
                      (val) =>
                          doctor._id.toHexString() ===
                          val.doctorId.toHexString(),
                  ).serviceId,
                  price,
                  clinicPercnetage: 100 - (doctor.doctorPercentage ?? 50),
              });
        const sessionResponce = new SessionGraph({ ...session });
        booking &&
            (await this.bookingService.updateOne({
                find: { _id: new ObjectId(bookingId) },
                update: { progress: BookingProgress.Ongoing },
                method: '$set',
            }));
        return sessionResponce;
    }

    @Mutation(() => SessionGraph)
    @Roles('doctor')
    @UseGuards(PreAuthGuard)
    async endSession(
        @Args('sessionId', { type: () => String }) sessionId: string,
    ) {
        const session = await this.sessionService.endSession(sessionId);
        session.bookingId &&
            (await this.bookingService.updateOne({
                find: { _id: session.bookingId },
                update: { progress: BookingProgress.Done },
                method: '$set',
            }));
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }

    @Query(() => SessionGraph, { nullable: true })
    async getActiveSessionByUserId(
        @Args('userId', { type: () => String }) userId: string,
    ) {
        const session = await this.sessionService.findActiveSession(userId);
        const sessionResponce = new SessionGraph({ ...session });
        return sessionResponce;
    }

    @Query(() => [SessionGraph])
    async getHistoryOfSessions(
        @Args('page', { type: () => Int }) page: number,
    ) {
        const sessionCursor = this.sessionService.historyOfSessionsCursor();
        const sessions = await paginate({
            cursor: sessionCursor,
            page,
            elementsPerPage: 10,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin', 'user')
    @UseGuards(PreAuthGuard)
    async getSessionsOfUser(
        @Args('userId', { type: () => String, nullable: true }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentTokenPayload() payload: Token,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.User
                ? this.sessionService.sessionsOfUserCursor(user._id)
                : this.sessionService.sessionsOfUserCursor(
                      new ObjectId(userId),
                  );
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 15,
        });
        return sessions;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getHistoryOfSessionsOfDoctor(
        @Args('doctorId', { nullable: true, type: () => String })
        doctorId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.Doctor
                ? this.sessionService.getSessionsOfDoctorCursor(user._id)
                : this.sessionService.getSessionsOfDoctorCursor(
                      new ObjectId(doctorId),
                  );
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 10,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getHistoryOfSessionsOfDoctorByPeriodsOfTime(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @Args('firstDate', { type: () => GraphQLISODateTime }) firstDate: Date,
        @Args('secondDate', { type: () => GraphQLISODateTime })
        secondDate: Date,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessions =
            payload.role === TokenRoles.Doctor
                ? await this.sessionService.getSessionsOfDoctorByPeriodsOfTimeCursor(
                      {
                          doctorId: user._id,
                          firstDate,
                          secondDate,
                      },
                  )
                : await this.sessionService.getSessionsOfDoctorByPeriodsOfTimeCursor(
                      {
                          doctorId: new ObjectId(doctorId),
                          firstDate,
                          secondDate,
                      },
                  );
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Query(() => [SessionGraph])
    @Roles('doctor', 'admin')
    @UseGuards(PreAuthGuard)
    async getDoctorsSessionsOfUser(
        @Args('doctorId', { type: () => String, nullable: true })
        doctorId: string,
        @Args('userId', { type: () => String }) userId: string,
        @Args('page', { type: () => Int }) page: number,
        @CurrentUserGraph() user: { _id: ObjectId },
        @CurrentTokenPayload() payload: Token,
    ) {
        const sessionsCursor =
            payload.role === TokenRoles.Doctor
                ? this.sessionService.getSessionsByDoctorsAndUserCursor({
                      doctorId: user._id,
                      userId: new ObjectId(userId),
                  })
                : this.sessionService.getSessionsByDoctorsAndUserCursor({
                      doctorId: new ObjectId(doctorId),
                      userId: new ObjectId(userId),
                  });
        const sessions = await paginate({
            cursor: sessionsCursor,
            page,
            elementsPerPage: 15,
        });
        const sessionsResponce = sessions.map(
            (val) => new SessionGraph({ ...val }),
        );
        return sessionsResponce;
    }

    @Mutation(() => String)
    async funckingPlanOfTakingShit(
        @Args('daysToRepeat', { type: () => [String] })
        daysToRepeat: string[],
        @Args('description') description: string,
        @Args('to') to: string,
        @Args('freq') freq: string,
    ) {
        const date = new Date();
        const endDat = moment(date).add(20, 'minute').toDate();
        const dkddk = this.calendarSer.createEvent({
            eventName: 'Назначение',
            description,
            startDate: date,
            endDate: endDat,
            repeating: daysToRepeat,
            summary: description,
            timezone: 'Asia/Almaty',
            freq,
        });
        await this.mailService.sendOneMailWithCalendarEvent({
            calendar: dkddk,
            sender: 'cliniclucem@gmail.com',
            text: 'Начначение',
            subject: 'Начначение',
            reciever: to,
        });
        return 'wpifejnvwpiurenviw';
    }
}
