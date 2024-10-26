import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './common/services/firebase.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; 
import { BoardModule } from './board/board.module'; 
import { CheckInModule } from './checkin/checkin.module'; 
import { EventModule } from './event/event.module'; 
import { NotificationModule } from './notification/notification.module'; 
import { SurveyModule } from './survey/survey.module'; 
//import { CommonModule } from '../src/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 전역 환경 변수 설정
    UserModule,
    AuthModule,
    BoardModule,
    CheckInModule,
    EventModule,
    NotificationModule,
    SurveyModule,
    //CommonModule,
  ],
  providers: [FirebaseService], // Firebase 서비스 등록
  exports: [FirebaseService],
})
export class AppModule {}