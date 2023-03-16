import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SmartSearchModule } from '../helpers/smartSearch/search.module';
import { TokenModule } from '../helpers/token/token.module';
import { SecretaryModule } from '../secretary/secretary.module';
import { SpecializationModule } from '../specialization/specialization.module';
import { UserModule } from '../user/user.module';
import { ServiceResolver } from './resolver/service.resolver';
import { ServiceService } from './service/service.service';

@Module({
    imports: [
        MongoModule,
        SmartSearchModule,
        TokenModule,
        forwardRef(() => UserModule),
        SpecializationModule,
        forwardRef(() => AdminModule),
        forwardRef(() => SecretaryModule),
        forwardRef(() => DoctorModule),
    ],
    providers: [ServiceService, ServiceResolver],
    exports: [ServiceService],
})
export class ServiceModule {}
