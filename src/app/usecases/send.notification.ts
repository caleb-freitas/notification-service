import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { NotificationRepository } from '../repositories/notification';

interface SendNotificationInput {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationOutput {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationInput,
  ): Promise<SendNotificationOutput> {
    const { recipientId, category, content } = request;

    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content),
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
