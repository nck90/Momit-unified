export class SurveyResponse {
    id: string; // Firestore 문서 ID
    surveyId: string; // 설문조사 ID
    respondent: string; // 응답자 이메일 혹은 ID
    answers: Record<string, string>; // 질문 ID와 해당하는 답변을 JSON 형태로 저장
    submittedAt: Date; // 응답 제출 시간
  }