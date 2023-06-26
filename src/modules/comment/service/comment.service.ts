import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';
import { Db, ObjectId } from 'mongodb';
import { BasicService } from 'src/modules/helpers/basic.service';
import { DATABASE_CONNECTION } from 'src/modules/helpers/database/mongo.provider';
import { User } from 'src/modules/user/model/user.interface';
import { removeUndefinedFromObject } from 'src/utils/filterObjectFromNulls';
import { Comment } from '../model/comment.model';
import { CreateComment } from '../model/createComment.args';

@Injectable()
export class CommentService extends BasicService<Comment> {
    constructor(@Inject(DATABASE_CONNECTION) private database: Db) {
        super();
        this.userCollectonDbService = this.database.collection('comment');
        // this.basicLookups = [
        //     {
        //         from: 'user',
        //         localField: 'userId',
        //         foreignField: '_id',
        //         as: 'user',
        //         isArray: false,
        //     },
        //     {
        //         from: ''
        //     }
        // ];
    }

    async create(args: CreateComment & { userId: ObjectId }) {
        const {
            commentParentId: _commentParentId,
            doctorId: _doctorId,
            userId: _userId,
            dateCreated,
        } = args;
        const [commentParentId, doctorId, userId] = [
            _commentParentId && new ObjectId(_commentParentId),
            new ObjectId(_doctorId),
            new ObjectId(_userId),
        ];
        const comment: Comment = {
            ...args,
            _id: new ObjectId(),
            commentParentId,
            dateCreated: new Date(dateCreated),
            doctorId,
            userId,
        };
        removeUndefinedFromObject(comment);
        console.log(comment);
        await this.insertOne(comment);
        return comment;
    }

    getOfDoctor(doctorId: ObjectId) {
        const cursor = this.userCollectonDbService.aggregate<
            Comment & {
                user: User;
                dependentComments: Comment[];
            }
        >([
            {
                $match: {
                    doctorId,
                    commentParentId: {
                        $exists: false,
                    },
                },
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users',
                },
            },
            {
                $addFields: {
                    user: {
                        $first: '$users',
                    },
                },
            },
            {
                $lookup: {
                    from: 'comment',
                    let: {
                        id: '$_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$commentParentId', '$$id'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'user',
                                localField: 'userId',
                                foreignField: '_id',
                                as: 'users',
                            },
                        },
                        {
                            $addFields: {
                                user: {
                                    $first: '$users',
                                },
                            },
                        },
                    ],
                    as: 'dependentComments',
                },
            },
        ]);
        return cursor;
    }
}
