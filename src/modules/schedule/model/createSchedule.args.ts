import { ArgsType, Field } from "@nestjs/graphql";
import { AppointmentInput } from "src/modules/appointment/model/appointment.input";
import { Modify } from "src/utils/modifyType";
import { Schedule } from "./schedule.interface";



@ArgsType()
export class CreateSchedule implements Modify<Omit<Schedule, "_id" | "appointmentIds">, {
    doctorId: string,
    date: string
}> {
    @Field()
    date: string;

    @Field(() => AppointmentInput)
    firstAppointment: AppointmentInput;

    @Field()
    doctorId: string;
}