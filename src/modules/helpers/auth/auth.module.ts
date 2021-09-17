import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { PreAuthGuardUser } from './auth.service';

@Module({
    imports: [UserModule, DoctorModule, TokenModule],
    exports: [UserModule, DoctorModule, TokenModule],
})
export class PreAuthModule {}
