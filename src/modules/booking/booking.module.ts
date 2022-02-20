import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { NotificationModule } from '../notification/notification.module';
import { ServiceModule } from '../service/service.module';
import { BookingResolver } from './resolver/booking.resolver';
import { BookingService } from './service/booking.service';

@Module({
    imports: [MongoModule, PreAuthModule, ServiceModule, NotificationModule],
    providers: [BookingResolver, BookingService],
    exports: [BookingService],
})
export class BookingModule {}
