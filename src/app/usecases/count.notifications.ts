import { NotificationRepository } from '../repositories/notification';
import { Injectable } from '@nestjs/common';

interface CountNotificationsInput {
  recipientId: string;
}

interface CountNotificationsOutput {
  count: number;
}

@Injectable()
export class CountNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountNotificationsInput,
  ): Promise<CountNotificationsOutput> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
