import { Module } from "@nestjs/common";
import { DoctorModule } from "../doctor/doctor.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { DoctorDeseaseService } from "./service/doctorDesease.service";


@Module({
    imports: [MongoModule],
    providers: [DoctorDeseaseService],
    exports: [DoctorDeseaseService]
})
export class DoctorDeseaseModule {}