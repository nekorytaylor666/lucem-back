import { FactoryProvider } from '@nestjs/common';
import Mailgun from 'mailgun-js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mailgun = require('mailgun-js');

export const MAILGUN_CONNECTION = 'MAILGUN_CONNECTION';

export const mailGunProvider: FactoryProvider<Mailgun.Mailgun> = {
    provide: MAILGUN_CONNECTION,
    useFactory: () => {
        try {
            const mg = mailgun({
                apiKey: '797c639a92fa047dd78a95583d81a36d-90ac0eb7-3345f02f',
                domain: 'thegefest.com',
                host: 'api.eu.mailgun.net',
            });
            return mg;
        } catch (e) {
            console.log(e);
        }
    },
    inject: [],
};
