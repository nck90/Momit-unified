export class Event {
    id: string; // Firestore 문서 ID
    title: string;
    description?: string;
    date: Date;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
    participants: Participant[]; // 참가자 배열
    qrCodeUrl?: string; // QR 코드 URL 저장
  }
  
  export class Participant {
    id: string; // Firestore 문서 ID 대신 Firestore에서는 사용하지 않음
    email: string;
  }