import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SubmitSurveyResponseDto } from './dto/submit-survey-response.dto';

@Controller('surveys')  // 'surveys' 경로로 통일
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // 설문 생성
  @Post()
  async createSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.createSurvey(createSurveyDto);
  }

  // 설문 응답 제출
  @Post(':surveyId/responses')
  async submitResponse(
    @Param('surveyId') surveyId: string,
    @Body() submitSurveyResponseDto: SubmitSurveyResponseDto,
  ) {
    return await this.surveyService.submitResponse(surveyId, submitSurveyResponseDto);
  }

  // 특정 설문 조회
  @Get(':surveyId')
  async getSurvey(@Param('surveyId') surveyId: string) {
    return await this.surveyService.getSurvey(surveyId);
  }

  // 전체 설문 목록 조회
  @Get()
  async getAllSurveys() {
    return await this.surveyService.getAllSurveys();
  }

  // 특정 설문조사의 응답 조회 추가
  @Get(':surveyId/responses')
  async getSurveyResponses(@Param('surveyId') surveyId: string) {
    return await this.surveyService.getSurveyResponses(surveyId);
  }
}