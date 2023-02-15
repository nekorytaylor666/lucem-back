import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, Endpoint, Credentials, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { ReadStream } from 'fs';
import * as sharp from 'sharp';
import { PhotoURL } from '../helpers/uploadFiles/imageUpload/photoURL.interface';
// import { PhotoUrl } from './models/photo.model';

@Injectable()
export class AWSPhotoUploadService {
    constructor(private config: ConfigService) {}

    public s3 = new S3({
        // endpoint: new Endpoint(this.config.get('DO_SPACES_ENDPOINT')),
        credentials: new Credentials({
            accessKeyId: this.config.get('ACCESS_KEY_ID'),
            secretAccessKey: this.config.get('SECRET_ACCESS_KEY'),
        }),
    });
    get bucketName(): string {
        return this.config.get('AWS_BUCKET_NAME');
    }

    async removeImage(
        Key: PhotoURL,
    ): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>[]> {
        return Promise.all([
            this.s3
                .deleteObject({
                    Bucket: this.bucketName,
                    Key: Key.m,
                })
                .promise(),
            this.s3
                .deleteObject({
                    Bucket: this.bucketName,
                    Key: Key.xl,
                })
                .promise(),
            this.s3
                .deleteObject({
                    Bucket: this.bucketName,
                    Key: Key.thumbnail,
                })
                .promise(),
        ]);
    }

    async uploadImageAWS(fileReadStream: ReadStream): Promise<PhotoURL> {
        const args = await this.resizeImg(fileReadStream);
        return this.uploadToDatabase(args);
    }

    async uploadToDatabase([thumbnailBuffer, l_Buffer, xl_Buffer]: [
        Buffer,
        Buffer,
        Buffer,
    ]): Promise<PhotoURL> {
        const _keyStr =
            new Date().getTime().toString() +
            Math.random().toString(36).substr(2, 5);
        await Promise.all([
            this.s3
                .putObject({
                    Bucket: this.bucketName,
                    Key: _keyStr + '_thumbnail',
                    ACL: 'public-read',
                    Body: thumbnailBuffer,
                })
                .promise(),
            this.s3
                .putObject({
                    Bucket: this.bucketName,
                    Key: _keyStr + '_M',
                    ACL: 'public-read',
                    Body: l_Buffer,
                })
                .promise(),
            this.s3
                .putObject({
                    Bucket: this.bucketName,
                    Key: _keyStr + '_XL',
                    ACL: 'public-read',
                    Body: xl_Buffer,
                })
                .promise(),
        ]);

        const _baseUrl = this.config.get('CDN_BASED') + _keyStr;
        return {
            xl: _baseUrl + '_XL',
            m: _baseUrl + '_M',
            thumbnail: _baseUrl + '_thumbnail',
        };
    }

    private async resizeImg(
        fileReadStream: ReadStream,
    ): Promise<[Buffer, Buffer, Buffer]> {
        const _sharpResizeThumbnail = sharp().resize({
            height: 50,
            width: 50,
            fit: 'cover',
        });
        const _sharpResize_m = sharp().resize(200, 200, {
            fit: 'cover',
        });
        const _sharpResize_xl = sharp().resize(1000, 1000, {
            fit: 'cover',
        });
        const _keyStr =
            new Date().getTime().toString() +
            Math.random().toString(36).substr(2, 5);
        return Promise.all([
            fileReadStream.pipe(_sharpResizeThumbnail).toBuffer(),
            fileReadStream.pipe(_sharpResize_m).toBuffer(),
            fileReadStream.pipe(_sharpResize_xl).toBuffer(),
        ]);
    }
}
