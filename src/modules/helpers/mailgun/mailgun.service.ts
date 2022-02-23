import { Inject, Injectable } from '@nestjs/common';
import { ICalCalendar } from 'ical-generator';
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

    async sendOneMailWithCalendarEvent(args: {
        calendar: ICalCalendar;
        sender: string;
        reciever: string;
        text: string;
        subject: string;
    }) {
        const { calendar, sender, reciever, text, subject } = args;
        const mailData: Mail.Options = {
            alternatives: [
                {
                    contentType: 'text/calendar',
                    content: Buffer.from(calendar.toString()),
                    contentDisposition: 'inline',
                },
            ],
            from: sender,
            text,
            to: reciever,
            subject,
        };
        try {
            await this.mailGun.sendMail(mailData);
        } catch (e) {
            throw e;
        }
    }
}
