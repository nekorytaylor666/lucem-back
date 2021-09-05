import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { AppointmentService } from "./service/appointment.service";


@Module({
    imports: [MongoModule],
    providers: [AppointmentService],
    exports: [AppointmentService]
})
export class AppointmentModule {}