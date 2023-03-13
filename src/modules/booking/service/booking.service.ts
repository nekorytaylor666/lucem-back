import { Inject, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { Db, ObjectId } from 'mongodb';
import { Doctor } from 'src/modules/doctor/model/doctor.interface';
import { BasicService } from 'src/modules/helpers/basic.service';
import { Service } from 'src/modules/service/model/service.interface';
import { User } from 'src/modules/user/model/user.interface';
import { parseTime } from 'src/utils/parseTime';
import { Booking, BookingProgress } from '../model/booking.interface';
import { CreateBooking } from '../model/createBooking.args';
import * as moment from 'moment';
import { isWithinInterval, parseISO } from 'date-fns';

@Injectable()
export class BookingService extends BasicService<Booking> {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {
        super();
        this.dbService = this.database.collection<Booking>('booking');
        this.basicLookups = [
            {
                from: 'user',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                isArray: false,
            },
            {
                from: 'service',
                localField: 'serviceId',
                foreignField: '_id',
                as: 'service',
                isArray: false,
            },
            {
                from: 'doctor',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doctor',
                isArray: false,
            },
        ];
    }

    async getBookingsByDoctorIdAndDates(args: {
        doctorId: ObjectId;
        firstDate: Date;
        secondDate: Date;
    }) {
        const { doctorId, firstDate, secondDate } = args;
        const bookings = await this.findWithAddictivesCursor<
            Booking & {
                user: User;
                service: Service;
                doctor: Doctor;
            }
        >({
            matchQuery: {
                doctorId: doctorId,
                startDate: { $gte: firstDate, $lte: secondDate },
            },
            lookups: this.basicLookups,
        }).toArray();
        return bookings;
    }

    async create(
        args: Omit<CreateBooking, 'doctorId' | 'serviceId'> & {
            userId: string;
            doctor: Doctor;
            service: Service;
        },
    ) {
        const {
            userId: _userId,
            startDate,
            endDate: _endDate,
            doctor,
            service,
        } = args;
        const userId = new ObjectId(_userId);
        const endDate = service.durationInMinutes
            ? moment(startDate)
                  .add(service.durationInMinutes, 'minutes')
                  .toDate()
            : _endDate;

        // create start date and set current year month but set the day and time from the start date

        //     moment(args.endDate).second(),
        const checkIfWorkTimeExists = doctor.workTimes.find((val, i) => {
            const utcStartWork = moment.utc(val.startTime);
            const utcEndWork = moment.utc(val.endTime);
            const utcStart = moment(startDate).utc();
            const utcEnd = moment(endDate).utc();
            const start = new Date(
                moment().year(),
                moment().month(),
                moment().add(i, 'day').date(),
                moment(utcStartWork).hour(),
                moment(utcStartWork).minute(),
                moment(utcStartWork).second(),
            );
            const end = new Date(
                moment().year(),
                moment().month(),
                moment().add(i, 'day').date(),
                moment(utcEndWork).hour(),
                moment(utcEndWork).minute(),
                moment(utcEndWork).second(),
            );

            const bookingStart = new Date(
                utcStart.year(),
                utcStart.month(),
                utcStart.date(),
                utcStart.hour(),
                utcStart.minute(),
                utcStart.second(),
            );

            const bookingEnd = new Date(
                utcEnd.year(),
                utcEnd.month(),
                utcEnd.date(),
                utcEnd.hour(),

                utcEnd.minute(),
                utcEnd.second(),
            );

            return (
                isWithinInterval(bookingStart, {
                    start,
                    end,
                }) &&
                isWithinInterval(bookingEnd, {
                    start,
                    end,
                })
            );
        });
        if (!checkIfWorkTimeExists)
            throw new ApolloError("he doesn't work during this time");
        const checkIfTimeIsTaken = await this.findOneWithOptions({
            fields: ['startDate', 'endDate', 'doctorId'],
            values: [{ $lte: startDate }, { $gte: endDate }, doctor._id],
        });
        if (checkIfTimeIsTaken)
            throw new ApolloError('the time is already booked');
        const booking: Booking = {
            serviceId: service._id,
            userId,
            startDate,
            endDate,
            progress: BookingProgress.Upcoming,
            doctorId: doctor._id,
            price: service.price,
        };
        const insertBooking = await this.insertOne(booking);
        booking._id = insertBooking;
        return booking;
    }

    async findUpcomingBookingsOfDoctor(args: {
        currentDate: Date;
        doctorId: ObjectId;
    }) {
        const { currentDate, doctorId } = args;
        const bookings = this.findWithAddictivesCursor<
            Booking & {
                user: User;
                service: Service;
                doctor: Doctor;
            }
        >({
            matchQuery: {
                doctorId: doctorId,
                startDate: { $gt: currentDate },
                progress: BookingProgress.Upcoming,
            },
            lookups: this.basicLookups,
        }).toArray();
        return bookings;
    }

    findUpcomingBookingsCursor(currentDate: Date) {
        const bookings = this.findWithAddictivesCursor<
            Booking & {
                user: User;
                service: Service;
                doctor: Doctor;
            }
        >({
            matchQuery: {
                startDate: { $gt: currentDate },
                progress: BookingProgress.Upcoming,
            },
            lookups: this.basicLookups,
        });
        return bookings;
    }
}
