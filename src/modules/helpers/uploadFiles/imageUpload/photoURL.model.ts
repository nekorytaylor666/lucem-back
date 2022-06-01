import { Field, InputType, ObjectType } from '@nestjs/graphql';
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
        if (photo.xl != null) this.xl = photo.xl;
        if (photo.m != null) this.m = photo.m;
        if (photo.thumbnail != null) this.thumbnail = photo.thumbnail;
    }
}

@InputType()
export class PhotoURLInput {
    @Field({ nullable: true })
    xl: string;

    @Field({ nullable: true })
    m: string;

    @Field({ nullable: true })
    thumbnail: string;
}
