// create-question.dto.ts
export class CreateQuestionDto {
    readonly userId: string; // 사용자 ID
    readonly eventId: string; // 관련된 이벤트 ID
    readonly content: string; // 질문 내용
  }