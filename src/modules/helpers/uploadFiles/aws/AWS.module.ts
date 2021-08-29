import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ImageUploadModule } from "../imageUpload/imageUpload.module";
import { AWSservice } from "./AWS.service";



@Module({
    imports: [ConfigModule, ImageUploadModule],
    exports: [AWSservice]
})
export class AWSModule {}