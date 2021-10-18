import { Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { WorkTimeResolver } from "./resolver/workTime.resolver";
import { WorkTimeService } from "./service/workTime.service";


@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [WorkTimeService, WorkTimeResolver],
    exports: [WorkTimeService]
})
export class WorkTimeModule {}