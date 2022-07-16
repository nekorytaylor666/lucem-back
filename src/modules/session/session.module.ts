import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { AppointmentBlankModule } from '../appointmentBlank/appointmentBlank.module';
import { BookingModule } from '../booking/booking.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { CalendarModule } from '../helpers/calendar/calendar.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { ServiceModule } from '../service/service.module';
import { SessionPaymentResolver } from './resolver/payment.resolver';
import { SessionResolver } from './resolver/session.resolver';
import { SessionService } from './service/session.service';

@Module({
    imports: [
        MongoModule,
        PreAuthModule,
        BookingModule,
        forwardRef(() => AppointmentBlankModule),
        CalendarModule,
        MailGunModule,
        ServiceModule,
    ],
    providers: [SessionService, SessionResolver, SessionPaymentResolver],
    exports: [SessionService],
})
export class SessionModule {}
