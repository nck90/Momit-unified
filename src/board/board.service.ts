import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class BoardService {
  constructor(private readonly firebaseService: FirebaseService) {}

  // 질문 생성
  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<any> {
    const { userId, eventId, content } = createQuestionDto;
    const db = this.firebaseService.getFirestore();
    const questionRef = db.collection('questions').doc();  // 문서 생성
    const questionData = {
      userId,
      eventId,
      content,
      createdAt: new Date(),
    };
    await questionRef.set(questionData);
    return { id: questionRef.id, ...questionData };
  }

  // 답변 생성
  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<any> {
    const { userId, questionId, content } = createAnswerDto;
    const db = this.firebaseService.getFirestore();
    const answerRef = db.collection('answers').doc();
    const answerData = {
      userId,
      questionId,
      content,
      createdAt: new Date(),
    };
    await answerRef.set(answerData);
    return { id: answerRef.id, ...answerData };
  }

  // 공지 생성
  async createAnnouncement(createAnnouncementDto: CreateAnnouncementDto): Promise<any> {
    const { eventId, title, content } = createAnnouncementDto;
    const db = this.firebaseService.getFirestore();
    const announcementRef = db.collection('announcements').doc();
    const announcementData = {
      eventId,
      title,
      content,
      createdAt: new Date(),
    };
    await announcementRef.set(announcementData);
    return { id: announcementRef.id, ...announcementData };
  }

  // 질문 목록 조회
  async getQuestions(eventId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const questionSnapshot = await db.collection('questions').where('eventId', '==', eventId).get();
    return questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 답변 목록 조회
  async getAnswers(questionId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const answerSnapshot = await db.collection('answers').where('questionId', '==', questionId).get();
    return answerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 공지 목록 조회
  async getAnnouncements(eventId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const announcementSnapshot = await db.collection('announcements').where('eventId', '==', eventId).get();
    return announcementSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}