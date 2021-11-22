import { Module } from '@nestjs/common';
import { MongoModule } from '../helpers/database/mongo.module';
import { SpecializationStatsResolver } from './resolver/specializationStats.resolver';
import { SpecializationStatsService } from './service/specializationStats.service';

@Module({
    imports: [MongoModule],
    providers: [SpecializationStatsResolver, SpecializationStatsService],
    exports: [SpecializationStatsService],
})
export class SpecializationStatsModule {}
