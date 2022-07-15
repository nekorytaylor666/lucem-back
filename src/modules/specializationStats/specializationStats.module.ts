import { Module } from '@nestjs/common';
import { MongoModule } from '../helpers/database/mongo.module';
import { SpecializationStatsResolver } from './resolver/specializationStats.resolver';
import { GeneralDataIncomeService } from './service/generalDataIncome.service';
import { SpecializationStatsService } from './service/specializationStats.service';

@Module({
    imports: [MongoModule],
    providers: [
        SpecializationStatsResolver,
        SpecializationStatsService,
        GeneralDataIncomeService,
    ],
    exports: [SpecializationStatsService],
})
export class SpecializationStatsModule {}
