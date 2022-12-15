import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in.memory.notification';
import { CountNotifications } from './count.notifications';

describe('count.notifications', () => {
  test('it should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countNotification = new CountNotifications(notificationRepository);

    await notificationRepository.create(
      new Notification({
        content: new Content('content'),
        category: 'category',
        recipientId: 'recipient_id',
      }),
    );
    await notificationRepository.create(
      new Notification({
        content: new Content('content'),
        category: 'category',
        recipientId: 'recipient_id',
      }),
    );
    await notificationRepository.create(
      new Notification({
        content: new Content('content'),
        category: 'category',
        recipientId: 'different_recipient_id',
      }),
    );

    const { count } = await countNotification.execute({
      recipientId: 'recipient_id',
    });

    expect(count).toBe(2);
  });
});
