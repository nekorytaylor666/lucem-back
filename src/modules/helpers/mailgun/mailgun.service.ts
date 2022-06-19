import { Inject, Injectable } from '@nestjs/common';
import { ICalCalendar } from 'ical-generator';
import Mailgun from 'mailgun-js';
import { MAILGUN_CONNECTION } from './mailgun.provider';

@Injectable()
export class MailService {
    constructor(@Inject(MAILGUN_CONNECTION) private mailGun: Mailgun.Mailgun) {}

    async sendOneMail(args: {
        sender: string;
        reciever: string;
        text: string;
        subject: string;
    }) {
        const { sender, reciever, text, subject } = args;
        try {
            // await this.mailGun.sendMail(mailData);
            await this.mailGun.messages().send({
                from: sender,
                to: reciever,
                text,
                subject,
            });
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
        try {
            const attachment = new this.mailGun.Attachment({
                data: Buffer.from(calendar.toString()),
                filename: 'Lucem.ics',
                contentType: 'text/calendar',
            });
            await this.mailGun.messages().send({
                from: sender,
                text,
                to: reciever,
                subject,
                attachment,
            });
        } catch (e) {
            throw e;
        }
    }
}
