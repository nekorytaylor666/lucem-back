import { Module } from "@nestjs/common";
import { MongoModule } from "../helpers/database/mongo.module";
import { UploadFileModule } from "../helpers/uploadFiles/uploadFiles.module";
import { AppointmentBlankResolver } from "./resolver/appointmentBlank.resolver";
import { AppointmentBlankService } from "./service/appointmentBlank.service";


@Module({
    imports: [MongoModule, UploadFileModule],
    providers: [AppointmentBlankService, AppointmentBlankResolver],
    exports: []
})
export class AppointmentBlankModule {}