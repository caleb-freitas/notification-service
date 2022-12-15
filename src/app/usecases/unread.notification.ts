import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './notification.not.found';

interface UnreadNotificationInput {
  notificationId: string;
}

type UnreadNotificationOutput = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationInput,
  ): Promise<UnreadNotificationOutput> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
