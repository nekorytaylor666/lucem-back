import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DeseasesModule } from '../deseases/deseases.module';
import { DoctorDeseaseModule } from '../doctorDesease/doctorDesease.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SmartSearchModule } from '../helpers/smartSearch/search.module';
import { TokenModule } from '../helpers/token/token.module';
import { uploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { UserModule } from '../user/user.module';
import { DoctorResolver } from './resolver/doctor.resolver';
import { DoctorService } from './service/doctor.service';

@Module({
    imports: [
        TokenModule,
        forwardRef(() => UserModule),
        MongoModule,
        DoctorDeseaseModule,
        DeseasesModule,
        SmartSearchModule,
        uploadFileModule,
        forwardRef(() => AdminModule)
    ],
    providers: [DoctorService, DoctorResolver],
    exports: [DoctorService],
})
export class DoctorModule {}
