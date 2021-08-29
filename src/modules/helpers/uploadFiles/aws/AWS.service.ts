import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, Endpoint, Credentials } from 'aws-sdk';
import { ReadStream } from 'fs';
import { ImageUploadService } from '../imageUpload/imageUpload.service';
import { PhotoURL } from '../imageUpload/photoURL.interface';

@Injectable()
export class AWSservice {
  constructor(
    private configService: ConfigService,
    private imageUploadService: ImageUploadService,
  ) {};
  private s3 = new S3({
    endpoint: new Endpoint(this.configService.get('DIGITAL_OCEAN_ENDPOINT')),
    credentials: new Credentials({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_ACCESS_KEY_SECRET'),
    }),
  });

  async saveImages(fileReadStream: ReadStream) {
    const keyStr =
      new Date().getTime().toString() + Math.random().toString(36).substr(2, 5);
    const resizedImages = this.imageUploadService.imageResize(fileReadStream);
    const [thumbnailImage, mImage, xlImage] = [resizedImages[0], resizedImages[1], resizedImages[2]]
    await Promise.all([
        this.s3.putObject({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: keyStr + '_thumbnail',
            ACL: 'public-read',
            Body: thumbnailImage
        }).promise(),
        this.s3.putObject({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: keyStr + '_m',
            ACL: 'public-read',
            Body: mImage
        }).promise(),
        this.s3.putObject({
            Bucket: this.configService.get('AWS_BUCKET'),
            Key: keyStr + '_xl',
            ACL: 'public-read',
            Body: xlImage
        }).promise()
    ]);
    const storageURL: string = this.configService.get('DIGITAL_OCEAN_SPACE');
    const photoURL: PhotoURL = {
        thumbnail: storageURL + '_thumbnail',
        m: storageURL + '_m',
        xl: storageURL + '_xl'
    }
    return photoURL;
  }
}
