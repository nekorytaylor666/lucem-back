import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { TokenModule } from '../token/token.module';
import { PreAuthGuardUser } from './auth.service';

@Module({
    imports: [UserModule, TokenModule],
    providers: [PreAuthGuardUser],
    exports: [PreAuthGuardUser, UserModule, TokenModule],
})
export class PreAuthModule {}
