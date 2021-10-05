import { Module } from '@nestjs/common';
import { AdminModule } from 'src/modules/admin/admin.module';
import { DoctorModule } from 'src/modules/doctor/doctor.module';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';



@Module({
    imports: [UserModule, DoctorModule, TokenModule, AdminModule],
    exports: [UserModule, DoctorModule, TokenModule, AdminModule],
})
export class PreAuthModule {}
