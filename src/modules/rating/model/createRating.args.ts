import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Rating } from './rating.interface';

@ArgsType()
export class CreateRating
    implements
        Modify<
            Omit<Rating, 'userId' | '_id'>,
            {
                doctorId: string;
            }
        >
{
    @Field()
    doctorId: string;

    @Field({ nullable: true })
    comment: string;

    @Field(() => Int)
    rating: number
}
