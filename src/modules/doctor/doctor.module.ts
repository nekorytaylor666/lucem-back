import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { TokenModule } from "../helpers/token/token.module";
import { DoctorResolver } from "./resolver/doctor.resolver";
import { DoctorService } from "./service/doctor.service";


@Module({
    imports: [TokenModule, MongoModule],
    providers: [DoctorService, DoctorResolver],
    exports: []
})
export class DoctorModule {}