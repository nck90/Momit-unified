import { Module } from '@nestjs/common';
import { CheckInService } from './checkin.service';
import { CheckInController } from './checkin.controller';
import { FirebaseService } from '../common/services/firebase.service';
import { CheckInGateway } from './checkin.gateway';

@Module({
  imports: [],
  controllers: [CheckInController],
  providers: [CheckInService, FirebaseService, CheckInGateway],
})
export class CheckInModule {}
