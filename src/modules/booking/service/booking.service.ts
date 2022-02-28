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
        const endDate = service
            ? moment().add(service.durationInMinutes, 'minutes').toDate()
            : _endDate;
        const checkIfWorkTimeExists = doctor.workTimes.find(
            (val) =>
                val.startTime <= parseTime(startDate) &&
                val.endTime >= parseTime(endDate),
        );
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
            },
            lookups: this.basicLookups,
        });
        return bookings;
    }
}
