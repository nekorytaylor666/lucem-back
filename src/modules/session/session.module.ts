import { Module } from '@nestjs/common';
import { BookingModule } from '../booking/booking.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SessionPaymentResolver } from './resolver/payment.resolver';
import { SessionResolver } from './resolver/session.resolver';
import { SessionService } from './service/session.service';

@Module({
    imports: [MongoModule, PreAuthModule, BookingModule],
    providers: [SessionService, SessionResolver, SessionPaymentResolver],
    exports: [SessionService],
})
export class SessionModule {}
