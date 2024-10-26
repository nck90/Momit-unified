export class Survey {
    id: string;
    title: string;
    description?: string;
    questions: { questionText: string, options?: string[] }[]; // 질문 및 옵션
    createdAt: Date;
  
    constructor(id: string, title: string, description: string, questions: { questionText: string, options?: string[] }[], createdAt: Date) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.questions = questions;
      this.createdAt = createdAt;
    }
  }