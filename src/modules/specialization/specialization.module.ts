import { Module } from "@nestjs/common";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { uploadFileModule } from "../helpers/uploadFiles/uploadFiles.module";
import { SpecializationDoctorModule } from "../specializationDoctor/specializationDoctor.module";
import { SpecializationResolver } from "./resolver/specialization.resolver";
import { SpecializationService } from "./service/specialization.service";



@Module({
    imports: [MongoModule, uploadFileModule, SpecializationDoctorModule, PreAuthModule],
    providers: [SpecializationResolver, SpecializationService, SpecializationDoctorModule],
    exports: []
})
export class SpecializationModule {}