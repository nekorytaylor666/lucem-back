import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AWSPhotoUploadService } from './awsSpace.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [AWSPhotoUploadService],
    exports: [AWSPhotoUploadService],
})
export class AWSPhotoUploadModule {}
