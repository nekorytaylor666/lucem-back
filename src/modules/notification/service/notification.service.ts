import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { Service } from 'src/modules/service/model/service.interface';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { dateStyling, timeStyling } from 'src/utils/dateStyling';
import { User } from 'src/modules/user/model/user.interface';
import { CalendarService } from 'src/modules/helpers/calendar/service/calendar.service';
import { MailService } from 'src/modules/helpers/mailgun/mailgun.service';
import { CreateNotification } from '../model/createNotification.args';
import { BasicService } from 'src/modules/helpers/basic.service';
import { DATABASE_CONNECTION } from 'src/modules/helpers/database/mongo.provider';
import { Db, ObjectId } from 'mongodb';
import { Notification } from '../model/notification.interface';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';

@Injectable()
export class NotificationService extends BasicService<Notification> {
    constructor(
        @Inject(DATABASE_CONNECTION) private database: Db,
        private mailService: MailService,
        private configService: ConfigService,
        private calendarService: CalendarService,
    ) {
        super();
        this.dbService = this.database.collection('notification');
    }

    private senderMail = this.configService.get('CLINIC_MAIL_USERNAME');

    async create(args: CreateNotification) {
        const { commentId, bookingId, type } = args;
        const notification: Notification = {
            _id: new ObjectId(),
            type,
            commentId: commentId && new ObjectId(commentId),
            bookingId: bookingId && new ObjectId(bookingId),
            dateCreated: new Date(),
        };
        removeUndefinedFromObject(notification);
        await this.insertOne(notification);
        return notification;
    }

    async setMailNotification(args: {
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
                // await this.mailService.sendMail({
                //     sender: this.senderMail,
                //     subject: 'Прием к врачу Lucem',
                //     text,
                //     to: user.email,
                // });
                await this.mailService.sendOneMail({
                    sender: this.senderMail,
                    subject: 'Прием к врачу Lucem',
                    text,
                    reciever: user.email,
                });
            }, millsecondsToSend - dayInMilliseconds),
        ]);
    }

    async calendarNotification(args: {
        user: User;
        doctor: Doctor;
        service: Service;
        booking: Booking;
    }) {
        const { user, doctor, service, booking } = args;
        const calendar = this.calendarService.createEvent({
            eventName: `${service.name}`,
            startDate: booking.startDate,
            endDate: booking.endDate,
            summary: `${service.name}, врач ${doctor.fullName}, кабинет ${doctor.cabinet}`,
            description: `${doctor.fullName} будет ждать вас в ${timeStyling({
                date: booking.startDate,
                locale: 'ru',
            })}. По адресу "ул. Аманат 2, Нур-Султан 020000", кабинет ${
                doctor.cabinet
            }. стоимость услуги ${service.price} тенге`,
            location: '',
            organizer: {
                name: 'Lucem',
                email: this.senderMail,
            },
            timezone: 'Asia/Almaty',
        });
        await this.mailService.sendOneMailWithCalendarEvent({
            calendar,
            sender: this.senderMail,
            reciever: user.email,
            text: 'что то там',
            subject: 'что то там',
        });
    }

    getNotification() {
        const notificationCursor = this.dbService.aggregate([
            {
                $lookup: {},
            },
        ]);
    }
}
