// import { UseGuards } from '@nestjs/common';
// import { Args, Int, Query, Resolver } from '@nestjs/graphql';
// import { Roles } from 'src/modules/helpers/auth/auth.roles';
// import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
// import { NotificationTypes } from '../model/notification.enum';
// import { NotificationService } from '../service/notification.service';

// @Resolver()
// export class NotificationResolver {
//     constructor(private notificationService: NotificationService) {}

//     @Query()
//     @Roles('admin')
//     @UseGuards(PreAuthGuard)
//     async getNotifications(
//         @Args('page', { type: () => Int }) page: number,
//         @Args('type', { type: () => NotificationTypes})) {
//         const
//     }
// }
