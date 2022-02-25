import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DoctorModule } from '../doctor/doctor.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { TokenModule } from '../helpers/token/token.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { SecretaryModule } from '../secretary/secretary.module';
import { UserModule } from '../user/user.module';
import { SpecializationResolver } from './resolver/specialization.resolver';
import { SpecializationService } from './service/specialization.service';

@Module({
    imports: [
        MongoModule,
        UploadFileModule,
        forwardRef(() => UserModule),
        forwardRef(() => AdminModule),
        forwardRef(() => DoctorModule),
        forwardRef(() => SecretaryModule),
        TokenModule,
    ],
    providers: [SpecializationResolver, SpecializationService],
    exports: [SpecializationService],
})
export class SpecializationModule {}
