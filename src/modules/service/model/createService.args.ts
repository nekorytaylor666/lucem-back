import { ArgsType, Field } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Service } from './service.interface';

@ArgsType()
export class CreateService
    implements
        Modify<
            Omit<Service, '_id'>,
            {
                specializationId: string;
            }
        >
{
    @Field()
    name: string;

    @Field()
    price: number;

    @Field()
    description: string;

    @Field(() => Boolean, { nullable: true })
    isShown: false;

    @Field({ nullable: true })
    specializationId: string;
}
