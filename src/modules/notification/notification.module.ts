import { Module } from '@nestjs/common';
import { CalendarModule } from '../helpers/calendar/calendar.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { NotificationService } from './service/notification.service';

@Module({
    imports: [MailGunModule, CalendarModule, MongoModule],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
