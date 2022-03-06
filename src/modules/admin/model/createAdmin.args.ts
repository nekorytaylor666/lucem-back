import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAdmin {
    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    password: string;
}
