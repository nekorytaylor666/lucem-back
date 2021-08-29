import { Module } from "@nestjs/common";
import { ImageUploadService } from "./imageUpload.service";




@Module({
    imports: [ImageUploadService],
    exports: [ImageUploadService]
})
export class ImageUploadModule {}