import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Service } from './service.interface';

@ArgsType()
export class CreateService
    implements
        Modify<
            Omit<Service, '_id'>,
            {
                specializationIds: string[];
                doctorIds?: string[];
            }
        >
{
    @Field()
    name: string;

    @Field(() => Int)
    price: number;

    @Field()
    description: string;

    @Field(() => Boolean, { nullable: true })
    isShown: false;

    @Field(() => [String], { nullable: true })
    specializationIds: string[];

    @Field(() => [String], { nullable: true })
    doctorIds?: string[];

    @Field(() => Int, { nullable: true })
    durationInMinutes?: number;
}
