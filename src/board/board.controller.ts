import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.boardService.createQuestion(createQuestionDto);
  }

  @Post('answer')
  createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.boardService.createAnswer(createAnswerDto);
  }

  @Post('announcement')
  createAnnouncement(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.boardService.createAnnouncement(createAnnouncementDto);
  }

  @Get('questions/:eventId')
  getQuestions(@Param('eventId') eventId: string) {
    return this.boardService.getQuestions(eventId);
  }

  @Get('answers/:questionId')
  getAnswers(@Param('questionId') questionId: string) {
    return this.boardService.getAnswers(questionId);
  }

  @Get('announcements/:eventId')
  getAnnouncements(@Param('eventId') eventId: string) {
    return this.boardService.getAnnouncements(eventId);
  }
}