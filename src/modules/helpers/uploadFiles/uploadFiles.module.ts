import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageUploadController } from './imageUpload/imageUpload.controller';
import { ImageUploadService } from './imageUpload/imageUpload.service';

@Module({
    providers: [ImageUploadService],
    exports: [ImageUploadService],
})
export class uploadFileModule {}
