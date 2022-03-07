import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Service } from './service.interface';

@ArgsType()
export class EditService
    implements
        Modify<
            Omit<Partial<Service>, '_id'>,
            {
                specializationId?: string[];
                doctorIds?: string[];
            }
        >
{
    @Field()
    serviceId: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    price: number;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Boolean, { nullable: true })
    isShown?: false;

    @Field(() => [String], { nullable: true })
    specializationId?: string[];

    @Field(() => [String], { nullable: true })
    doctorIds?: string[];

    @Field(() => Int, { nullable: true })
    durationInMinutes?: number;
}
