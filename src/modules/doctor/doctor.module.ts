import { forwardRef, Module } from "@nestjs/common";
import { DeseasesModule } from "../deseases/deseases.module";
import { DoctorDeseaseModule } from "../doctorDesease/doctorDesease.module";
import { PreAuthModule } from "../helpers/auth/auth.module";
import { MongoModule } from "../helpers/database/mongo.module";
import { TokenModule } from "../helpers/token/token.module";
import { UserModule } from "../user/user.module";
import { DoctorResolver } from "./resolver/doctor.resolver";
import { DoctorService } from "./service/doctor.service";


@Module({
    imports: [TokenModule, UserModule, MongoModule, DoctorDeseaseModule, DeseasesModule],
    providers: [DoctorService, DoctorResolver],
    exports: [DoctorService]
})
export class DoctorModule {}