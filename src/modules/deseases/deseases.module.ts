import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '../helpers/database/mongo.module';
import { DeseaseResolver } from './resolver/desease.resolver';
import { DeseaseService } from './service/desease.service';

@Module({
    imports: [ConfigModule, MongoModule],
    providers: [DeseaseService, DeseaseResolver],
    exports: [DeseaseService],
})
export class DeseasesModule {}
