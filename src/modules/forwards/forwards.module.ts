import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { ForwardsResolver } from './resolver/forwards.resolver';
import { ForwardsService } from './service/forwards.service';

@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [ForwardsResolver, ForwardsService],
    exports: [ForwardsService],
})
export class ForwardsModule {}
