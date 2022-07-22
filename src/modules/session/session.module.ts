import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { AppointmentBlankModule } from '../appointmentBlank/appointmentBlank.module';
import { BookingModule } from '../booking/booking.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { CalendarModule } from '../helpers/calendar/calendar.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { ServiceModule } from '../service/service.module';
import { SessionPaymentResolver } from './resolver/payment.resolver';
import { SessionDataResolver } from './resolver/sesion_data.resolver';
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
        DoctorModule,
    ],
    providers: [
        SessionService,
        SessionResolver,
        SessionPaymentResolver,
        SessionDataResolver,
    ],
    exports: [SessionService],
})
export class SessionModule {}
