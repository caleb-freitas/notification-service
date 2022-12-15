import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in.memory.notification';
import { ListNotifications } from './list.notifications';

describe('count.notifications', () => {
  test('it should be able to list notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const listNotifications = new ListNotifications(notificationRepository);

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

    const { notifications } = await listNotifications.execute({
      recipientId: 'recipient_id',
    });

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient_id' }),
        expect.objectContaining({ recipientId: 'recipient_id' }),
      ]),
    );
  });
});
