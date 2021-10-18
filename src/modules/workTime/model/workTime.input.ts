import { Field, GraphQLISODateTime, InputType } from "@nestjs/graphql";


@InputType()
export class WorkTimeDateInput {
    @Field(() => GraphQLISODateTime)
    startTime: Date;

    @Field(() => GraphQLISODateTime)
    endTime: Date;
}