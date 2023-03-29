import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Modify } from 'src/utils/modifyType';
import { Comment } from './comment.model';

@ArgsType()
export class CreateComment
    implements
        Modify<
            Omit<Comment, '_id' | 'dateCreated' | 'userId'>,
            {
                doctorId: string;
                commentParentId?: string;
            }
        >
{
    @Field({ nullable: true })
    text?: string;

    @Field(() => String, { nullable: true })
    fakeName?: string;

    @Field(() => String, { nullable: true })
    dateCreated?: string;

    @Field(() => Int)
    rating: number;

    @Field()
    doctorId: string;

    @Field({ nullable: true })
    commentParentId?: string;
}
