import { Field, InputType } from "@nestjs/graphql";
import { Modify } from "src/utils/modifyType";
import { Appointment } from "./appointment.interface";


@InputType()
export class AppointmentInput implements Modify<Omit<Appointment, "_id" | "userId">, {
    serviceId: string,
    date: string,
}>{
    @Field()
    serviceId: string;

    @Field()
    date: string;
}