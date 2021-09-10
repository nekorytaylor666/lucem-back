import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { SpecializationDoctorService } from "./service/specializationDoctor.service";


@Module({
    imports: [MongoModule],
    providers: [SpecializationDoctorService],
    exports: [SpecializationDoctorService] 
})
export class SpecializationDoctorModule {}