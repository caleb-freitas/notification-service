import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './notification.not.found';

interface ReadNotificationInput {
  notificationId: string;
}

type ReadNotificationOutput = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationInput,
  ): Promise<ReadNotificationOutput> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
