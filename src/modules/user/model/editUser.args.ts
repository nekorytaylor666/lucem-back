import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { PeculiaritiesInput } from './utils/peculiarities.input';

@ArgsType()
export class EditUser {
    @Field({ nullable: true })
    fullName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field(() => GraphQLISODateTime, { nullable: true })
    dateOfBirth?: Date;

    @Field(() => PeculiaritiesInput, { nullable: true })
    peculiarities?: PeculiaritiesInput;

    @Field({ nullable: true })
    userId: string;
}
