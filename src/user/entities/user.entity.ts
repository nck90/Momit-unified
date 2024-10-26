export enum UserRole {
  PARTICIPANT = 'participant',
  ORGANIZER = 'organizer',
}

export class User {
  id?: string; // Firestore에서 문서 ID로 사용될 수 있으므로 optional
  email: string;
  password?: string; // 소셜 로그인 시 필요 없을 수 있음
  role: UserRole = UserRole.PARTICIPANT;
  name?: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}