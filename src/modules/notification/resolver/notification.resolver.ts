import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/modules/helpers/auth/auth.roles';
import { PreAuthGuard } from 'src/modules/helpers/auth/auth.service';
import { paginate } from 'src/utils/paginate';
import { NotificationTypes } from '../model/notification.enum';
import { NotificationGraph } from '../model/notification.interface';
import { NotificationService } from '../service/notification.service';

@Resolver()
export class NotificationResolver {
    constructor(private notificationService: NotificationService) {}

    @Query(() => [NotificationGraph])
    @Roles('admin')
    @UseGuards(PreAuthGuard)
    async getNotifications(
        @Args('page', { type: () => Int }) page: number,
        @Args('type', { type: () => NotificationTypes, nullable: true })
        type: NotificationTypes,
    ) {
        const notificationsCursor =
            await this.notificationService.getNotifications(type);
        const notifications = await paginate({
            cursor: notificationsCursor,
            page,
            elementsPerPage: 10,
        });
        const notificationsResponce = notifications.map(
            (val) => new NotificationGraph({ ...val }),
        );
        return notificationsResponce;
    }
}
