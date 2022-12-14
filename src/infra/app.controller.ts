import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { CreateNotificationBody } from './create.notification.body';

const defaultNotificationSelect = Prisma.validator<Prisma.NotificationSelect>()(
  {
    id: true,
    recipientId: true,
    content: true,
    category: true,
    readedAt: true,
    createdAt: true,
  },
);

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.prisma.notification.findMany({
      select: defaultNotificationSelect,
    });
  }

  @Post()
  async create(@Body() data: CreateNotificationBody) {
    await this.prisma.notification.create({
      select: defaultNotificationSelect,
      data,
    });
  }
}
