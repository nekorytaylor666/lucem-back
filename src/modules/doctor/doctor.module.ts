import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DeseasesModule } from '../deseases/deseases.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SmartSearchModule } from '../helpers/smartSearch/search.module';
import { TokenModule } from '../helpers/token/token.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { UserModule } from '../user/user.module';
import { DoctorResolver } from './resolver/doctor.resolver';
import { DoctorService } from './service/doctor.service';

@Module({
    imports: [
        TokenModule,
        forwardRef(() => UserModule),
        MongoModule,
        DeseasesModule,
        SmartSearchModule,
        UploadFileModule,
        forwardRef(() => AdminModule),
    ],
    providers: [DoctorService, DoctorResolver],
    exports: [DoctorService],
})
export class DoctorModule {}
