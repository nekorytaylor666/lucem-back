import { Field, ObjectType } from '@nestjs/graphql';
import { PhotoURL } from './photoURL.interface';

@ObjectType('PhotoURL')
export class PhotoURLGraph implements PhotoURL {
    @Field({ nullable: true })
    xl: string;

    @Field({ nullable: true })
    m: string;

    @Field({ nullable: true })
    thumbnail: string;

    constructor(photo: Partial<PhotoURL>) {
        if (photo.xl) this.xl = photo.xl;
        if (photo.m) this.m = photo.m;
        if (photo.thumbnail) this.thumbnail = photo.thumbnail;
    }
}
