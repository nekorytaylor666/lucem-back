import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { User } from 'src/modules/user/model/user.interface';
import { UserGraph } from 'src/modules/user/model/user.model';
import { Modify } from 'src/utils/modifyType';

export interface Comment {
    _id: ObjectId;
    text?: string;
    rating: number;
    doctorId: ObjectId;
    userId: ObjectId;
    commentParentId: ObjectId;
    dateCreated: Date;
}

@ObjectType('Comment')
export class CommentGraph
    implements
        Modify<
            Comment,
            {
                _id: string;
                doctorId: string;
                userId: string;
                commentParentId: string;
            }
        >
{
    @Field()
    _id: string;

    @Field()
    doctorId: string;

    @Field()
    userId: string;

    @Field(() => UserGraph)
    user: UserGraph;

    @Field({ nullable: true })
    text?: string;

    @Field(() => Int, { defaultValue: 10 })
    rating: number;

    @Field()
    commentParentId: string;

    @Field(() => GraphQLISODateTime)
    dateCreated: Date;

    @Field(() => [CommentGraph])
    dependentComments: CommentGraph[];

    constructor(
        comment: Partial<
            Comment & {
                user: User;
                dependentComments: Comment[];
            }
        >,
    ) {
        if (comment._id != null) this._id = comment._id.toHexString();
        if (comment.commentParentId != null)
            this.commentParentId = comment.commentParentId.toHexString();
        if (comment.doctorId != null)
            this.doctorId = comment.doctorId.toHexString();
        if (comment.rating != null) this.rating = comment.rating;
        if (comment.text != null) this.text = comment.text;
        if (comment.user != null)
            this.user = new UserGraph({ ...comment.user });
        if (comment.userId != null) this.userId = comment.userId.toHexString();
        if (comment.dateCreated != null) this.dateCreated = comment.dateCreated;
        if (comment.dependentComments != null)
            this.dependentComments = comment.dependentComments.map(
                (val) => new CommentGraph({ ...val }),
            );
    }
}
