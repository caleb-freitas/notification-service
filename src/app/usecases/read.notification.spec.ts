import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in.memory.notification';
import { CancelNotification } from './cancel.notification';
import { NotificationNotFound } from './notification.not.found';
import { ReadNotification } from './read.notification';

describe('read.notification', () => {
  test('it should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = new Notification({
      content: new Content('content'),
      category: 'category',
      recipientId: 'recipient_id',
    });

    notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readedAt).toEqual(
      expect.any(Date),
    );
  });

  test('it should not be able to read a non-existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new CancelNotification(notificationRepository);

    expect(async () => {
      await readNotification.execute({
        notificationId: 'fake_notification_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
