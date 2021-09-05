import { Module } from "@nestjs/common";
import { AppointmentModule } from "../appointment/appointment.module";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { UserModule } from "../user/user.module";
import { ScheduleResolver } from "./resolver/schedule.resolver";
import { ScheduleService } from "./service/schedule.service";


@Module({
    imports: [MongoModule, AppointmentModule, PreAuthModule],
    providers: [ScheduleResolver, ScheduleService],
    exports: []
})
export class ScheduleModule {}