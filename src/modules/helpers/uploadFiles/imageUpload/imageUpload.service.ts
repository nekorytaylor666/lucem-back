import { Injectable } from '@nestjs/common';
import { ReadStream, createWriteStream, writeFileSync } from 'fs';
import { join } from 'path';
import * as sharp from 'sharp';
import Buffer from 'sharp';
import { PhotoURL } from './photoURL.interface';

@Injectable()
export class ImageUploadService {
    private async imageResize(fileReadStream: ReadStream): Promise<Buffer[]> {
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
            fileReadStream.pipe(thumbnailResizeImage).toFormat('jpg').toBuffer(),
            fileReadStream.pipe(mResizeImage).toBuffer(),
            fileReadStream.pipe(xlResizeImage).toBuffer(),
        ]);
        return [thumbnailBuffer, mBuffer, xlBuffer];
    }

    async storeImages(stream: ReadStream, req: string): Promise<PhotoURL> {
        const resizedImages = await this.imageResize(stream);
        const keyStr =
            new Date().getTime().toString() +
            Math.random().toString(36).substr(2, 5);
        writeFileSync(join(process.cwd(), 'uploads') + `/thumbnail-${keyStr}.jpg`, resizedImages[0]);
        writeFileSync(join(process.cwd(), 'uploads') + `/m-${keyStr}.jpg`, resizedImages[1]);
        writeFileSync(join(process.cwd(), 'uploads') + `/xl-${keyStr}.jpg`, resizedImages[2]);
        const photoUrl: PhotoURL = {
            thumbnail: `${req}/media/thumbnail-${keyStr}.jpg`,
            m: `${req}/media/m-${keyStr}.jpg`,
            xl: `${req}/media/xl-${keyStr}.jpg`            
        };
        return photoUrl;
    }
}
