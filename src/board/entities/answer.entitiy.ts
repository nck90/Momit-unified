export class Answer {
    id: string; // 파이어베이스 문서 ID
    userId: string;
    questionId: string;
    content: string;
    createdAt: Date;
  
    constructor(id: string, userId: string, questionId: string, content: string, createdAt: Date) {
      this.id = id;
      this.userId = userId;
      this.questionId = questionId;
      this.content = content;
      this.createdAt = createdAt;
    }
  }