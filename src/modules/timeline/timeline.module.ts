import { Module } from "@nestjs/common";
import { DoctorModule } from "../doctor/doctor.module";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { TimelineResolver } from "./resolver/timeline.resolver";
import { TimelineService } from "./service/timeline.service";


@Module({
    imports: [MongoModule, PreAuthModule, DoctorModule],
    providers: [TimelineResolver, TimelineService],
    exports: [TimelineService]
})
export class TimelineModule {}