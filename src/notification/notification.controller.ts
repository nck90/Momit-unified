import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get(':userId')
  getNotifications(@Param('userId') userId: string) {
    return this.notificationService.getNotifications(userId);
  }

  @Patch(':notificationId/read')
  markAsRead(@Param('notificationId') notificationId: string) {
    return this.notificationService.markAsRead(notificationId);
  }
}