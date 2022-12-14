import { Notification } from './notification';
import { Content } from './content';

describe('notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('This is the notification content'),
      category: 'category',
      recipientId: 'recipient_id',
    });
    expect(notification).toBeTruthy();
  });
});
