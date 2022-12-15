import { Body, Controller, Param, Post, Patch, Get } from '@nestjs/common';
import { SendNotification } from '@app/usecases/send.notification';
import { CreateNotificationBody } from '../dto/create.notification.body';
import { NotificationViewModel } from '../view.models/notification';
import { CancelNotification } from '@app/usecases/cancel.notification';
import { CountNotifications } from '@app/usecases/count.notifications';
import { ListNotifications } from '@app/usecases/list.notifications';
import { ReadNotification } from '@app/usecases/read.notification';
import { UnreadNotification } from '@app/usecases/unread.notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly countNotification: CountNotifications,
    private readonly listNotifications: ListNotifications,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countNotification.execute({
      recipientId: id,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async listFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.listNotifications.execute({
      recipientId: id,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() data: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute(data);
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
