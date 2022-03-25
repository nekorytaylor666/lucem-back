import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { DoctorStatsResolver } from './resolver/doctorStats.resolver';
import { DoctorStatsService } from './service/doctorStats.service';

@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [DoctorStatsResolver, DoctorStatsService],
    exports: [DoctorStatsService],
})
export class DoctorStatsModule {}
