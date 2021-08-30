import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AWSservice } from "./aws/AWS.service";
import { ImageUploadService } from "./imageUpload/imageUpload.service";



@Module({ 
    providers: [AWSservice, ImageUploadService],
    exports: [AWSservice, ImageUploadService]
})
export class uploadFileModule {}