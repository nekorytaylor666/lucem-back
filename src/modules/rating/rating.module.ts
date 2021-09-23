import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';

import { MongoModule } from '../helpers/database/mongo.module';

import { RatingResolver } from './resolver/rating.resolver';
import { RatingService } from './service/rating.service';

@Module({
    imports: [MongoModule, PreAuthModule],
    providers: [RatingResolver, RatingService],
    exports: [],
})
export class RatingModule {}
