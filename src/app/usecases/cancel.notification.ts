import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './notification.not.found';

interface CancelNotificationInput {
  notificationId: string;
}

type CancelNotificationOutput = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationInput,
  ): Promise<CancelNotificationOutput> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
