import { Module } from '@nestjs/common';
import { AdminModule } from 'src/modules/admin/admin.module';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { SecretaryModule } from 'src/modules/secretary/secretary.module';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [
        UserModule,
        DoctorModule,
        TokenModule,
        AdminModule,
        SecretaryModule,
    ],
    providers: [TokenModule],
    exports: [
        UserModule,
        DoctorModule,
        TokenModule,
        AdminModule,
        SecretaryModule,
    ],
})
export class PreAuthModule {}
