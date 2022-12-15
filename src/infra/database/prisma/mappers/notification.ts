import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readedAt: notification.readedAt,
      createdAt: notification.createdAt,
    };
  }
  static toDomain(raw: PrismaNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readedAt: raw.readedAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
