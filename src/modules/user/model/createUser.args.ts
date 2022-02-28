import { ArgsType, Field } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { User } from './user.interface';
import { PeculiaritiesInput } from './utils/peculiarities.input';

@ArgsType()
export class CreateUser
    implements
        Modify<
            Omit<User, '_id' | 'passwordHASH'>,
            {
                dateOfBirth: string;
                peculiarities?: PeculiaritiesInput;
            }
        >
{
    @Field()
    fullName: string;

    @Field()
    dateOfBirth: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field(() => PeculiaritiesInput, { nullable: true })
    peculiarities?: PeculiaritiesInput;
}
