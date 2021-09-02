import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Desease {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => String)
    @Prop()
    name: string;
}

export type DeseaseDocument = Desease & Document;

export const DeseaseSchema = SchemaFactory.createForClass(Desease);
