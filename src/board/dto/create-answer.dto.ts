// create-answer.dto.ts
export class CreateAnswerDto {
    readonly userId: string;
    readonly questionId: string; // 관련된 질문 ID
    readonly content: string; // 답변 내용
  }