import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { BookingResolver } from './resolver/booking.resolver';
import { BookingService } from './service/booking.service';

@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [BookingResolver, BookingService],
    exports: [BookingService],
})
export class BookingModule {}
