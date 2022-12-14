import { InMemoryNotificationRepository } from '../../../test/repositories/in.memory.notification';
import { SendNotification } from './send.notification';

describe('send.notification', () => {
  test('it should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'notification content',
      category: 'category',
      recipientId: 'recipient_id',
    });

    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
