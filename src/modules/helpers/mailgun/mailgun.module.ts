import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mailGunProvider } from './mailgun.provider';
import { MailService } from './mailgun.service';

@Module({
    imports: [ConfigModule],
    providers: [mailGunProvider, MailService],
    exports: [mailGunProvider, MailService],
})
export class MailGunModule {}
