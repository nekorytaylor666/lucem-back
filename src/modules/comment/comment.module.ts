import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { NotificationModule } from '../notification/notification.module';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';

@Module({
    imports: [MongoModule, PreAuthModule, NotificationModule],
    providers: [CommentService, CommentResolver],
    exports: [CommentService],
})
export class CommentModule {}
