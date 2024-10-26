export class Announcement {
    id: string; // 파이어베이스 문서 ID
    eventId: string;
    title: string;
    content: string;
    createdAt: Date;
  
    constructor(id: string, eventId: string, title: string, content: string, createdAt: Date) {
      this.id = id;
      this.eventId = eventId;
      this.title = title;
      this.content = content;
      this.createdAt = createdAt;
    }
  }