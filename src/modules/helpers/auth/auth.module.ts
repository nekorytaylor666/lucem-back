import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { UserService } from 'src/modules/user/service/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';
import { PreAuthGuardUser } from './auth.service';

@Module({
    imports: [UserModule, TokenModule, DoctorModule],
    providers: [PreAuthGuardUser],
    exports: [PreAuthGuardUser, DoctorModule, TokenModule, UserModule],
})
export class PreAuthModule {}
