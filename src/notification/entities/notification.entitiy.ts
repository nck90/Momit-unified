  // src/notification/entities/notification.entity.ts
  export class Notification {
    id: string; // Firebase 문서 ID
    userId: string; // 알림을 받을 사용자 ID
    title: string; // 알림 제목
    message: string; // 알림 내용
    eventId?: string; // 특정 이벤트와 연관된 경우의 이벤트 ID
    createdAt: Date; // 알림 생성 시간
    read: boolean; // 읽음 여부
    notificationType: string; // 알림 종류 (e.g., "event_update", "checkin_reminder")

    constructor(partial: Partial<Notification>) {
      Object.assign(this, partial);
    }
  }