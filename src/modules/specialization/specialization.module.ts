import { Module } from '@nestjs/common';
import { PreAuthModule } from '../helpers/auth/auth.module';
import { MongoModule } from '../helpers/database/mongo.module';
import { UploadFileModule } from '../helpers/uploadFiles/uploadFiles.module';
import { SpecializationResolver } from './resolver/specialization.resolver';
import { SpecializationService } from './service/specialization.service';

@Module({
    imports: [MongoModule, UploadFileModule, PreAuthModule],
    providers: [SpecializationResolver, SpecializationService],
    exports: [SpecializationService],
})
export class SpecializationModule {}
