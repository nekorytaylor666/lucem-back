import { ObjectId } from 'mongodb';
import { NotificationTypes } from './notification.enum';

export interface CreateNotification {
    bookingId?: ObjectId;
    type: NotificationTypes;
    commentId?: ObjectId;
}
