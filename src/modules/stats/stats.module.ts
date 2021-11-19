import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { StatsResolver } from './resolver/stats.resolver';
import { StatsService } from './service/stats.service';

@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [StatsResolver, StatsService],
    exports: [StatsService],
})
export class StatsModule {}
