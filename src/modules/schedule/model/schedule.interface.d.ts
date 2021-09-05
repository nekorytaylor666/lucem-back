import { ObjectId } from "mongodb";
import { Appointment } from "src/modules/appointment/model/appointment.interface";

export interface Schedule {
    _id?: ObjectId;
    date: Date;
    appointmentIds: ObjectId[];
    doctorId: ObjectId;
};