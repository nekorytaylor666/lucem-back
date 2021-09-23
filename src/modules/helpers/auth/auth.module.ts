import { Module } from '@nestjs/common';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';



@Module({
    imports: [UserModule, DoctorModule, TokenModule],
    exports: [UserModule, DoctorModule, TokenModule],
})
export class PreAuthModule {}
