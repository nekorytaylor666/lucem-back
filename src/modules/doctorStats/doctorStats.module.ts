import { Module } from '@nestjs/common';
import { MongoModule } from '../helpers/database/mongo.module';
import { DoctorStatsResolver } from './resolver/doctorStats.resolver';
import { DoctorStatsService } from './service/doctorStats.service';

@Module({
    imports: [MongoModule],
    providers: [DoctorStatsResolver, DoctorStatsService],
    exports: [DoctorStatsService],
})
export class DoctorStatsModule {}
