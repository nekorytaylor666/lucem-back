import { registerEnumType } from '@nestjs/graphql';

export enum NotificationTypes {
    NewBooking = 'newBooking',
    CancelledBookingByDoctor = 'cancelledBookingByDoctor',
    CancelledBookingByUser = 'cancelledBookingByUser',
    CancelledBookingByAdmin = 'cancelledBookingByAdmin',
    NewComment = 'newComment',
}

registerEnumType(NotificationTypes, {
    name: 'NotificationTypes',
});
