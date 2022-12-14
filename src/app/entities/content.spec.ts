import { Content } from './content';

describe('notification.content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('This is a notification content');
    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification with less than 3 characters', () => {
    expect(() => new Content('_')).toThrow();
  });

  test('it should not be able to create a notification with more than 240 characters', () => {
    expect(() => new Content('_'.repeat(241))).toThrow();
  });
});
