import { ArgsType, Field } from '@nestjs/graphql';
import { Specialization } from './specialization.interface';

@ArgsType()
export class EditSpecialization
    implements Omit<Partial<Specialization>, '_id' | 'photoURL'>
{
    @Field()
    specializationId: string;

    @Field({ nullable: true })
    colorCode: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;
}
