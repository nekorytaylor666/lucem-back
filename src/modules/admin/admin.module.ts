import { forwardRef, Module } from '@nestjs/common';
import { DoctorModule } from '../doctor/doctor.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { TokenModule } from '../helpers/token/token.module';
import { SecretaryModule } from '../secretary/secretary.module';
import { UserModule } from '../user/user.module';
import { AdminResolver } from './resolver/admin.resolver';
import { AdminService } from './service/admin.service';

@Module({
    imports: [
        MongoModule,
        TokenModule,
        forwardRef(() => UserModule),
        forwardRef(() => DoctorModule),
        forwardRef(() => SecretaryModule),
    ],
    providers: [AdminResolver, AdminService],
    exports: [AdminService],
})
export class AdminModule {}
