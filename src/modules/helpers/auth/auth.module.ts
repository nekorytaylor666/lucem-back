import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';
import { PreAuthGuardUser } from './auth.service';

@Module({
    imports: [UserModule, TokenModule, DoctorModule],
    providers: [PreAuthGuardUser],
    exports: [PreAuthGuardUser, UserModule, TokenModule, DoctorModule],
})
export class PreAuthModule {}
