import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { FirebaseService } from '../common/services/firebase.service';

@Module({
  controllers: [SurveyController], // SurveyController 등록
  providers: [SurveyService, FirebaseService], // SurveyService와 FirebaseService 등록
  exports: [SurveyService],
})
export class SurveyModule {}