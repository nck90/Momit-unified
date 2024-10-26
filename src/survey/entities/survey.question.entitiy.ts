export class SurveyQuestion {
    id: string;
    question: string;
    createdAt: Date;
  
    constructor(id: string, question: string, createdAt: Date) {
      this.id = id;
      this.question = question;
      this.createdAt = createdAt;
    }
  }