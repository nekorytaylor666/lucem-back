import { ObjectId } from 'mongodb';
import { AllowedNotificationUserTypes } from './parts/notificationUserType.enum';

export interface Notifications {
    _id: ObjectId;
    adminId: ObjectId;
    user: {
        userType: AllowedNotificationUserTypes;
        userId: ObjectId;
    };
}
