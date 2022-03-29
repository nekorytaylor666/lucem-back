import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Booking } from 'src/modules/booking/model/booking.interface';
import { BookingGraph } from 'src/modules/booking/model/booking.model';
import { Comment, CommentGraph } from 'src/modules/comment/model/comment.model';
import { Modify } from 'src/utils/modifyType';
import { NotificationTypes } from './notification.enum';
import {
    NotificationDataGraphs,
    NotificationDataUnion,
} from './notification.union';

export interface Notification {
    _id: ObjectId;
    type: NotificationTypes;
    bookingId?: ObjectId;
    commentId?: ObjectId;
    seenByAdminsId?: ObjectId;
    dateCreated: Date;
}

@ObjectType('Notification')
export class NotificationGraph
    implements
        Modify<
            Omit<Notification, 'seenByAdminsId'>,
            {
                _id: string;
                bookingId?: string;
                commentId?: string;
            }
        >
{
    @Field()
    _id: string;

    @Field(() => NotificationTypes)
    type: NotificationTypes;

    @Field(() => NotificationDataUnion)
    data: NotificationDataGraphs;

    @Field({ nullable: true })
    bookingId?: string;

    @Field({ nullable: true })
    commentId?: string;

    @Field(() => GraphQLISODateTime)
    dateCreated: Date;

    constructor(
        notification: Partial<Notification> & {
            comment?: Comment;
            booking?: Booking;
        },
    ) {
        if (notification._id != null) this._id = notification._id.toHexString();
        if (notification.type != null) this.type = notification.type;
        if (notification.dateCreated != null)
            this.dateCreated = notification.dateCreated;
        if (notification.comment != null)
            this.data = new CommentGraph({ ...notification.comment });
        if (notification.booking != null)
            this.data = new BookingGraph({ ...notification.booking });
        if (notification.commentId != null)
            this.commentId = notification.commentId.toHexString();
        if (notification.bookingId != null)
            this.bookingId = notification.bookingId.toHexString();
    }
}
