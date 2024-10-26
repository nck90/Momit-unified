// src/notification/notification.module.ts
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { FirebaseService } from '../common/services/firebase.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, FirebaseService],
})
export class NotificationModule {}