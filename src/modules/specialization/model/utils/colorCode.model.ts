import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ColorCodeGradientGraph {
    @Field()
    start: string;

    @Field()
    finish: string;

    constructor(colorCode: { start: string; finish: string }) {
        if (colorCode.start) this.start = colorCode.start;
        if (colorCode.finish) this.finish = colorCode.finish;
    }
}
