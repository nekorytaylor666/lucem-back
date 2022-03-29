import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { DoctorService } from 'src/modules/doctor/service/doctor.service';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import {
    CurrentUserGraph,
    PreAuthGuard,
} from 'src/modules/helpers/auth/auth.service';
import { NotificationTypes } from 'src/modules/notification/model/notification.enum';
import { NotificationService } from 'src/modules/notification/service/notification.service';
import { paginate } from 'src/utils/paginate';
import { CommentGraph } from '../model/comment.model';
import { CreateComment } from '../model/createComment.args';
import { CommentService } from '../service/comment.service';

@Resolver()
export class CommentResolver {
    constructor(
        private commentService: CommentService,
        private doctorService: DoctorService,
        private notificationService: NotificationService,
    ) {}

    @Mutation(() => CommentGraph)
    @Roles('admin', 'user')
    @UseGuards(PreAuthGuard)
    async leaveComment(
        @Args() args: CreateComment,
        @CurrentUserGraph() user: { _id: ObjectId },
    ) {
        const comment = await this.commentService.create({
            ...args,
            userId: user._id,
        });
        await this.doctorService.updateOne({
            find: { _id: comment.doctorId },
            update: { numberOfRatings: 1, sumOfRatings: comment.rating },
            method: '$inc',
        });
        await this.notificationService.create({
            type: NotificationTypes.NewComment,
            commentId: comment._id,
        });
        const commentResponce = new CommentGraph({ ...comment });
        return commentResponce;
    }

    @Query(() => [CommentGraph])
    @Roles('none')
    @UseGuards(PreAuthGuard)
    async getCommentsOfDoctor(
        @Args('doctorId', { type: () => String }) doctorId: string,
        @Args('page', { type: () => Int }) page: number,
    ) {
        const commentsCursor = this.commentService.getOfDoctor(
            new ObjectId(doctorId),
        );
        const comments = await paginate({
            cursor: commentsCursor,
            page,
            elementsPerPage: 10,
        });
        const commentsResponce = comments.map(
            (val) => new CommentGraph({ ...val }),
        );
        return commentsResponce;
    }
}
