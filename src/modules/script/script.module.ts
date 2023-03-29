import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { SmartSearchModule } from '../helpers/smartSearch/search.module';
import { ScriptResolver } from './resolver/script.resolver';
import { ScriptService } from './service/script.service';

@Module({
    imports: [MongoModule, SmartSearchModule, CommentModule],
    providers: [ScriptResolver, ScriptService],
})
export class ScriptModule {}
