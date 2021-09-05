import { Inject, Injectable } from '@nestjs/common';
import { ObjectTypeDefinitionFactory } from '@nestjs/graphql/dist/schema-builder/factories/object-type-definition.factory';
import { Db, ObjectId } from 'mongodb';
import { Appointment } from 'src/modules/appointment/model/appointment.interface';
import { AppointmentService } from 'src/modules/appointment/service/appointment.service';
import { CreateSchedule } from '../model/createSchedule.args';
import { Schedule } from '../model/schedule.interface';

@Injectable()
export class ScheduleService {
    constructor(
        @Inject('DATABASE_CONNECTION') private database: Db,
        private appointmentService: AppointmentService,
    ) {}

    private get scheduleCollection() {
        return this.database.collection('schedule');
    }

    async findOne(args: Partial<Schedule>) {
        const schedule = await this.scheduleCollection.findOne(args);
        return schedule;
    }

    async insert(schedule: Schedule) {
        const insertSchedule = await this.scheduleCollection.insertOne(
            schedule,
        );
        schedule._id = insertSchedule.insertedId;
        return schedule;
    }

    async create(
        args: CreateSchedule & { userId: ObjectId },
    ): Promise<Schedule & { appointment: Appointment }> {
        const {
            date: _scheduleDate,
            doctorId: _scheduleDoctorId,
            userId: _appointmentUserId,
        } = args;
        const { serviceId: _appointmentServiceId, date: _appointmentDate } =
            args.firstAppointment;
        const [
            scheduleDate,
            scheduleDoctorId,
            appointmentUserId,
            appointmentServiceId,
            appointmentDate,
        ] = [
            new Date(_scheduleDate),
            new ObjectId(_scheduleDoctorId),
            new ObjectId(_appointmentUserId),
            new ObjectId(_appointmentServiceId),
            new Date(_appointmentDate),
        ];
        const appointment: Appointment = {
            serviceId: appointmentServiceId,
            date: appointmentDate,
            userId: appointmentUserId,
        };
        const insertAppointment = await this.appointmentService.insert(
            appointment,
        );
        const schedule: Schedule = {
            date: scheduleDate,
            appointmentIds: [insertAppointment._id],
            doctorId: scheduleDoctorId,
        };
        const insertSchedule = await this.insert(schedule);
        const scheduleResponce: Schedule & { appointment: Appointment } = {
            ...insertSchedule,
            appointment: {...insertAppointment}            
        };
        return scheduleResponce;
    }
}
