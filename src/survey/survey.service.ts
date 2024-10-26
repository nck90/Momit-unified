import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SubmitSurveyResponseDto } from './dto/submit-survey-response.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly firebaseService: FirebaseService) {}

  // 설문조사 생성
  async createSurvey(createSurveyDto: CreateSurveyDto): Promise<any> {
    const { title, description, questions } = createSurveyDto;

    const db = this.firebaseService.getFirestore();
    const surveyRef = db.collection('surveys').doc(); // 새로운 설문조사 ID 생성
    const surveyData = {
      title,
      description,
      questions, // 질문 리스트 그대로 저장
      createdAt: new Date(),
    };

    await surveyRef.set(surveyData); // Firestore에 설문조사 저장
    return { id: surveyRef.id, ...surveyData }; // 설문조사 ID와 함께 반환
  }

  // 설문 응답 제출
  async submitResponse(surveyId: string, submitSurveyResponseDto: SubmitSurveyResponseDto): Promise<any> {
    const { respondent, answers } = submitSurveyResponseDto;

    const db = this.firebaseService.getFirestore();
    const surveyRef = db.collection('surveys').doc(surveyId); // 주어진 설문조사 ID를 사용
    const surveyDoc = await surveyRef.get();
    
    // 설문조사가 없을 경우 예외 처리
    if (!surveyDoc.exists) {
      throw new NotFoundException(`Survey with ID ${surveyId} not found`);
    }

    // 응답 저장
    const responseRef = surveyRef.collection('responses').doc(); // 응답 서브 컬렉션
    const responseData = {
      respondent, // 응답자 정보
      answers, // 설문조사 응답
      submittedAt: new Date(),
    };

    await responseRef.set(responseData); // Firestore에 응답 저장
    return { id: responseRef.id, ...responseData }; // 응답 ID와 함께 반환
  }

  // 특정 설문조사 조회
  async getSurvey(surveyId: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const surveyRef = db.collection('surveys').doc(surveyId); // 주어진 설문조사 ID
    const surveyDoc = await surveyRef.get();
    
    // 설문조사가 없을 경우 예외 처리
    if (!surveyDoc.exists) {
      throw new NotFoundException(`Survey with ID ${surveyId} not found`);
    }
    
    return { id: surveyDoc.id, ...surveyDoc.data() }; // 설문조사 데이터 반환
  }

  // 전체 설문조사 조회
  async getAllSurveys(): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const surveysSnapshot = await db.collection('surveys').get(); // 모든 설문조사 가져오기

    // 각 설문조사 문서를 매핑하여 ID와 데이터를 포함한 객체 리스트로 반환
    return surveysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 특정 설문조사의 응답 조회
  async getSurveyResponses(surveyId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const surveyRef = db.collection('surveys').doc(surveyId); // 설문조사 ID로 서브 컬렉션 접근

    const responsesSnapshot = await surveyRef.collection('responses').get(); // 설문 응답 가져오기
    
    if (responsesSnapshot.empty) {
      throw new NotFoundException(`No responses found for survey with ID ${surveyId}`);
    }

    // 응답 문서를 매핑하여 ID와 데이터를 포함한 리스트로 반환
    return responsesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}