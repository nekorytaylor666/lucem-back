import { Args, Query, GraphQLISODateTime, Resolver } from '@nestjs/graphql';
import { AppointmentBlankService } from 'src/modules/appointmentBlank/service/appointmentBlank.service';
import { BookingService } from 'src/modules/booking/service/booking.service';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { CalendarService } from 'src/modules/helpers/calendar/service/calendar.service';
import { MailService } from 'src/modules/helpers/mailgun/mailgun.service';
import { ServiceService } from 'src/modules/service/service/service.service';
import { SessionGraph } from '../model/session.model';
import { SessionService } from '../service/session.service';

@Resolver()
export class SessionDataResolver {
    constructor(
        private sessionService: SessionService,
        private bookingService: BookingService,
        private serviceService: ServiceService,
        private doctorService: DoctorService,
        private appointmentBlankService: AppointmentBlankService,
        private calendarSer: CalendarService,
        private mailService: MailService,
    ) {}

    @Query(() => [SessionGraph])
    async getSessionPeriodTime(
        @Args('startTime', {
            type: () => GraphQLISODateTime,
        })
        startTime: Date,
        @Args('endTime', {
            type: () => GraphQLISODateTime,
        })
        endTime: Date,
    ) {
        const _cusror = this.sessionService.findWithAddictivesCursor({
            matchQuery: {
                endDate: {
                    $lte: endTime,
                },
                startDate: {
                    $gte: startTime,
                },
            },
            lookups: this.sessionService.basicLookups,
            sort: {
                _id: 1,
            },
        });
        const res = await _cusror.toArray();
        _cusror.close();
        return res;
    }
}
