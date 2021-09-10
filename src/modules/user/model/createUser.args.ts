import { ArgsType, Field } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { User } from './user.interface';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@ArgsType()
export class CreateUser
    implements
        Modify<
            Omit<User, '_id' | 'passwordHASH'>,
            {
                dateOfBirth: string;
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
}
