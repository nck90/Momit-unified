export class Question {
    id: string; // 파이어베이스 문서 ID
    userId: string;
    eventId: string;
    content: string;
    createdAt: Date;
  
    constructor(id: string, userId: string, eventId: string, content: string, createdAt: Date) {
      this.id = id;
      this.userId = userId;
      this.eventId = eventId;
      this.content = content;
      this.createdAt = createdAt;
    }
  }