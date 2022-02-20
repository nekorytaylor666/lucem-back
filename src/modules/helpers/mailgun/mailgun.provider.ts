import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const formData = require('form-data');
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const MailGun = require('mailgun.js');
// import Mailgun from 'mailgun.js';

export const MAILGUN_CONNECTION = 'MAILGUN_CONNECTION';

export type MailGunClient =
    nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

// export const mailGunProvider: FactoryProvider<any> = {
//     provide: MAILGUN_CONNECTION,
//     useFactory: (configService: ConfigService) => {
//         const apiKey = configService.get('MAILGUN_API_PRIVATE_KEY');
//         const mailgun: Mailgun = new MailGun(formData);
//         const client = mailgun.client({ username: 'Gefest', key: apiKey });
//         return client;
//     },
//     inject: [ConfigService],
// };

export const mailGunProvider: FactoryProvider<MailGunClient> = {
    provide: MAILGUN_CONNECTION,
    useFactory: (configService: ConfigService) => {
        try {
            const [mail, password] = [
                configService.get('CLINIC_MAIL_USERNAME'),
                configService.get('CLINIC_MAIL_PASSWORD'),
            ];
            const client = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mail,
                    pass: password,
                },
            });
            return client;
        } catch (e) {
            console.log(e);
        }
    },
    inject: [ConfigService],
};
