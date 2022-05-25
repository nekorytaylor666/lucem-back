import { forwardRef, Module } from '@nestjs/common';
import { AppointmentBlankModule } from '../appointmentBlank/appointmentBlank.module';
import { BookingModule } from '../booking/booking.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SessionPaymentResolver } from './resolver/payment.resolver';
import { SessionResolver } from './resolver/session.resolver';
import { SessionService } from './service/session.service';

@Module({
    imports: [
        MongoModule,
        PreAuthModule,
        BookingModule,
        forwardRef(() => AppointmentBlankModule),
    ],
    providers: [SessionService, SessionResolver, SessionPaymentResolver],
    exports: [SessionService],
})
export class SessionModule {}
