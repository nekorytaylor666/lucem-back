import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { MailGunClient, MAILGUN_CONNECTION } from './mailgun.provider';

@Injectable()
export class MailService {
    constructor(@Inject(MAILGUN_CONNECTION) private mailGun: MailGunClient) {}

    async sendOneMail(args: {
        sender: string;
        reciever: string;
        text: string;
        subject: string;
    }) {
        const { sender, reciever, text, subject } = args;
        const mailData: Mail.Options = {
            from: sender,
            to: reciever,
            text,
            subject,
        };
        try {
            await this.mailGun.sendMail(mailData);
        } catch (e) {
            throw e;
        }
    }
}
