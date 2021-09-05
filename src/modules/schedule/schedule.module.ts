import { Module } from "@nestjs/common";
import { AppointmentModule } from "../appointment/appointment.module";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { ServiceModule } from "../service/service.module";
import { UserModule } from "../user/user.module";
import { ScheduleResolver } from "./resolver/schedule.resolver";
import { ScheduleService } from "./service/schedule.service";


@Module({
    imports: [MongoModule, AppointmentModule, PreAuthModule, ServiceModule],
    providers: [ScheduleResolver, ScheduleService],
    exports: []
})
export class ScheduleModule {}