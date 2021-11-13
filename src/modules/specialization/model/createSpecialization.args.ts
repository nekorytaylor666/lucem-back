import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Specialization } from './specialization.interface';

@InputType()
export class ColorCodeGradientInput {
    @Field()
    start: string;

    @Field()
    finish: string;
}

@ArgsType()
export class CreateSpecialization
    implements Omit<Specialization, '_id' | 'photoURL'>
{
    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    colorCodeGradient: ColorCodeGradientInput;

    @Field(() => GraphQLUpload, {
        name: 'image',
        nullable: true,
    })
    image: Promise<FileUpload>;
}
