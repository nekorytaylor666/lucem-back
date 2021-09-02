import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';
import * as sharp from 'sharp';
import Buffer from 'sharp';

@Injectable()
export class ImageUploadService {
    async imageResize(fileReadStream: ReadStream): Promise<Buffer[]> {
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
            fileReadStream.pipe(thumbnailResizeImage).toBuffer(),
            fileReadStream.pipe(mResizeImage).toBuffer(),
            fileReadStream.pipe(xlResizeImage).toBuffer(),
        ]);
        return [thumbnailBuffer, mBuffer, xlBuffer];
    }
}
