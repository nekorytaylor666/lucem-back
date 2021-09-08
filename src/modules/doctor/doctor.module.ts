import { Module } from "@nestjs/common";
import { DeseasesModule } from "../deseases/deseases.module";
import { DoctorDeseaseModule } from "../doctorDesease/doctorDesease.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { TokenModule } from "../helpers/token/token.module";
import { DoctorResolver } from "./resolver/doctor.resolver";
import { DoctorService } from "./service/doctor.service";


@Module({
    imports: [TokenModule, MongoModule, DoctorDeseaseModule, DeseasesModule],
    providers: [DoctorService, DoctorResolver],
    exports: [DoctorService]
})
export class DoctorModule {}