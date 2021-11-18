import { Module } from '@nestjs/common';
import { MongoModule } from '../helpers/database/mongo.module';
import { StatsResolver } from './resolver/stats.resolver';
import { StatsService } from './service/stats.service';

@Module({
    imports: [MongoModule],
    providers: [StatsResolver, StatsService],
    exports: [StatsService],
})
export class StatsModule {}
