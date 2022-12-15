import { Module } from '@nestjs/common';
import { SendNotification } from '@app/usecases/send.notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { CancelNotification } from '@app/usecases/cancel.notification';
import { CountNotifications } from '@app/usecases/count.notifications';
import { ListNotifications } from '@app/usecases/list.notifications';
import { ReadNotification } from '@app/usecases/read.notification';
import { UnreadNotification } from '@app/usecases/unread.notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    CountNotifications,
    ListNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
