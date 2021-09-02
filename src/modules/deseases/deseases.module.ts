import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Desease, DeseaseSchema } from './model/desease.model';
import { DeseaseResolver } from './resolver/desease.resolver';
import { DeseaseService } from './service/desease.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Desease.name, schema: DeseaseSchema },
        ]),
    ],
    providers: [DeseaseService, DeseaseResolver],
    exports: [DeseaseService],
})
export class DeseasesModule {}
