import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { FirebaseService } from '../common/services/firebase.service'; // Firebase 연동을 위한 서비스

@Module({
  controllers: [EventController],
  providers: [EventService, FirebaseService], // EventService와 FirebaseService 제공
})
export class EventModule {}