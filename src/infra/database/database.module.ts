import { Module } from '@nestjs/common';
import { NotificationRepository } from '@app/repositories/notification';
import { PrismaNotificationRepository } from './prisma/repositories/notification';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
