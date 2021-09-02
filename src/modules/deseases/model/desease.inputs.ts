import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeseaseInput {
    @Field(() => String)
    name: string;
}
