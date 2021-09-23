import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from '../doctor/doctor.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SMSModule } from '../helpers/SMS/SMS.module';
import { TokenModule } from '../helpers/token/token.module';
import { uploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
    imports: [
        ConfigModule,
        MongoModule,
        TokenModule,
        forwardRef(() => DoctorModule),
        uploadFileModule,
        SMSModule,
        CacheModule.register(),
    ],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}