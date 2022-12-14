import { NotificationRepository } from '@app/repositories/notification';
import { Notification } from '@app/entities/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
