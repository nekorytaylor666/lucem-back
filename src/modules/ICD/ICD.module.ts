import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { SmartSearchModule } from '../helpers/smartSearch/search.module';
import { TokenModule } from '../helpers/token/token.module';
import { ICDResolver } from './resolver/ICD.resolver';
import { ICDService } from './service/ICD.service';

@Module({
    imports: [SmartSearchModule, TokenModule, PreAuthModule],
    providers: [ICDResolver, ICDService],
    exports: [ICDService],
})
export class ICDModule {}
