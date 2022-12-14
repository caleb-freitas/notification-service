import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/app/repositories/notification';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/notification';

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
