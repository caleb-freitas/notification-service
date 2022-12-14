import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/usecases/send.notification';
import { CreateNotificationBody } from '../dto/create.notification.body';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() data: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute(data);

    return {
      notification,
    };
  }
}
