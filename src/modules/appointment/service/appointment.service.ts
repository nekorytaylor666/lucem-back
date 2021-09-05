import { Inject, Injectable } from "@nestjs/common";
import { Db } from "mongodb";
import { Appointment } from "../model/appointment.interface";


@Injectable()
export class AppointmentService {
    constructor(@Inject('DATABASE_CONNECTION') private database: Db) {}

    private get appointmentCollection() {
        return this.database.collection('appointment');
    };

    async insert(appointment: Appointment) {
        const insertAppointment = await this.appointmentCollection.insertOne(appointment);
        appointment._id = insertAppointment.insertedId;
        return appointment;
    }
}