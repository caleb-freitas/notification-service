import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';

interface ListNotificationsInput {
  recipientId: string;
}

interface ListNotificationsOutput {
  notifications: Notification[];
}

@Injectable()
export class ListNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ListNotificationsInput,
  ): Promise<ListNotificationsOutput> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.listManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
