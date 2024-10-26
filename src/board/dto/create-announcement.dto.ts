// create-announcement.dto.ts
export class CreateAnnouncementDto {
    readonly eventId: string;
    readonly title: string; // 공지 제목
    readonly content: string; // 공지 내용
  }