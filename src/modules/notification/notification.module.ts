import { Module } from '@nestjs/common';
import { MailGunModule } from '../helpers/mailgun/mailgun.module';
import { NotificationService } from './service/notification.service';

@Module({
    imports: [MailGunModule],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
