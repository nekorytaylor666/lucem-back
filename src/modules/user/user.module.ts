import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { DoctorModule } from '../doctor/doctor.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SMSModule } from '../helpers/SMS/SMS.module';
import { TokenModule } from '../helpers/token/token.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
    imports: [
        ConfigModule,
        MongoModule,
        TokenModule,
        forwardRef(() => DoctorModule),
        UploadFileModule,
        SMSModule,
        CacheModule.register(),
        forwardRef(() => AdminModule),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
