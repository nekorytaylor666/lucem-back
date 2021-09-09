import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { uploadFileModule } from "../helpers/uploadFiles/uploadFiles.module";
import { SpecializationResolver } from "./resolver/specialization.resolver";
import { SpecializationService } from "./service/specialization.service";



@Module({
    imports: [MongoModule, uploadFileModule],
    providers: [SpecializationResolver, SpecializationService],
    exports: []
})
export class SpecializationModule {}