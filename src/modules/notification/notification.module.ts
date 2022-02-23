import { Module } from '@nestjs/common';
import { CalendarModule } from '../helpers/calendar/calendar.module';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { NotificationService } from './service/notification.service';

@Module({
    imports: [MailGunModule, CalendarModule],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
