import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DoctorModule } from '../doctor/doctor.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { TokenModule } from '../helpers/token/token.module';
import { UserModule } from '../user/user.module';
import { SecretaryResolver } from './resolver/secretary.resolver';
import { SecretaryService } from './service/secretary.service';

@Module({
    imports: [
        forwardRef(() => DoctorModule),
        forwardRef(() => UserModule),
        forwardRef(() => AdminModule),
        TokenModule,
        MongoModule,
    ],
    providers: [SecretaryResolver, SecretaryService],
    exports: [SecretaryService],
})
export class SecretaryModule {}
