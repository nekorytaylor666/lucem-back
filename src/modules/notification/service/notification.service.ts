import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/modules/helpers/mailgun/mailgun.service';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { dateStyling } from 'src/utils/dateStyling';
import { User } from 'src/modules/user/model/user.interface';

@Injectable()
export class NotificationService {
    constructor(
        private mailService: MailService,
        private configService: ConfigService,
    ) {}

    private senderMail = this.configService.get('CLINIC_MAIL_USERNAME');

    async setNotification(args: {
        user: User;
        doctor: Doctor;
        service: Service;
        dateToSend: Date;
        currentDate: Date;
        booking: Booking;
    }) {
        const { user, doctor, service, dateToSend, currentDate, booking } =
            args;
        const [dateToSendMilliseconds, currentDateMilliseconds] = [
            dateToSend.getTime(),
            currentDate.getTime(),
        ];
        const millsecondsToSend =
            dateToSendMilliseconds - currentDateMilliseconds;
        const dayInMilliseconds = 1000 * 60 * 60 * 12;
        if (millsecondsToSend < dayInMilliseconds) return;
        const date = dateStyling({ date: booking.startDate, locale: 'ru' });
        const text = `${user.fullName}, Здравствуйте! ${doctor.fullName} будет ждать вас в ${date} на прием "${service.name}" в кабинете "${doctor.cabinet}"`;
        await Promise.all([
            setTimeout(async () => {
                await this.mailService.sendOneMail({
                    sender: this.senderMail,
                    subject: 'Прием к врачу Lucem',
                    text,
                    reciever: user.email,
                });
            }, millsecondsToSend - dayInMilliseconds),
        ]);
    }
}
