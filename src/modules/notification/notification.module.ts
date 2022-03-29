import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { CalendarModule } from '../helpers/calendar/calendar.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { NotificationResolver } from './resolver/notification.resolver';
import { NotificationService } from './service/notification.service';

@Module({
    imports: [MailGunModule, CalendarModule, MongoModule, PreAuthModule],
    providers: [NotificationService, NotificationResolver],
    exports: [NotificationService],
})
export class NotificationModule {}
