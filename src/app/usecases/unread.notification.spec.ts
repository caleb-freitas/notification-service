import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in.memory.notification';
import { CancelNotification } from './cancel.notification';
import { NotificationNotFound } from './notification.not.found';
import { UnreadNotification } from './unread.notification';

describe('unread.notification', () => {
  test('it should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = new Notification({
      content: new Content('content'),
      category: 'category',
      recipientId: 'recipient_id',
      readedAt: new Date(),
    });

    notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readedAt).toBeNull();
  });

  test('it should not be able to unread a non-existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new CancelNotification(notificationRepository);

    expect(async () => {
      await unreadNotification.execute({
        notificationId: 'fake_notification_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
