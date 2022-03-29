import { registerEnumType } from '@nestjs/graphql';

export enum NotificationTypes {
    NewBooking = 'newBooking',
    CancelledBookingByDoctor = 'cancelledBookingByDoctor',
    NewComment = 'newComment',
}

registerEnumType(NotificationTypes, {
    name: 'NotificationTypes',
});
