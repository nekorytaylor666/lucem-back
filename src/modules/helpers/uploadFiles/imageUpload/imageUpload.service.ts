import { Injectable } from '@nestjs/common';
import { ReadStream, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import Buffer from 'sharp';
import { AWSPhotoUploadService } from 'src/modules/uploadPhoto/awsSpace.service';
import { PhotoURL } from './photoURL.interface';

@Injectable()
export class ImageUploadService {
    constructor(public awsPhotoUploadService: AWSPhotoUploadService) {}

    private async imageResize(
        fileReadStream: ReadStream,
    ): Promise<[Buffer, Buffer, Buffer]> {
        const thumbnailResizeImage = sharp().resize({
            height: 50,
            width: 50,
            fit: 'cover',
        });
        const mResizeImage = sharp().resize(200, 200, {
            fit: 'cover',
        });
        const xlResizeImage = sharp().resize(1000, 1000, {
            fit: 'cover',
        });
        const [thumbnailBuffer, mBuffer, xlBuffer] = await Promise.all([
            fileReadStream
                .pipe(thumbnailResizeImage)
                .toFormat('jpg')
                .toBuffer(),
            fileReadStream.pipe(mResizeImage).toBuffer(),
            fileReadStream.pipe(xlResizeImage).toBuffer(),
        ]);
        return [thumbnailBuffer, mBuffer, xlBuffer];
    }

    async storeImages(stream: ReadStream, req: string): Promise<PhotoURL> {
        const resizedImages = await this.imageResize(stream);
        return this.awsPhotoUploadService.uploadToDatabase(resizedImages);
    }

    async updateImage(args: {
        stream: ReadStream;
        req: string;
        oldUrls: string[];
    }) {
        const { stream, req, oldUrls } = args;
        const resizedImages = await this.imageResize(stream);
        return this.awsPhotoUploadService.uploadToDatabase(resizedImages);
    }
}
