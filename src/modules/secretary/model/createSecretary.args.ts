import { ArgsType, Field } from '@nestjs/graphql';
import { Secretary } from './secretary.interface';

@ArgsType()
export class CreateSecretary
    implements Omit<Secretary, '_id' | 'passwordHASH'>
{
    @Field()
    fullName: string;

    @Field()
    phoneNumber: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
