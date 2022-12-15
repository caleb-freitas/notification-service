import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@app/usecases/send.notification';
import { CreateNotificationBody } from '../dto/create.notification.body';
import { NotificationViewModel } from '../view.models/notification';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() data: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute(data);

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
