import { Field, InputType } from '@nestjs/graphql';
import { Desease } from './desease.interface';

@InputType()
export class CreateDeseaseInput implements Partial<Desease> {
    @Field(() => String)
    name: string;
}
