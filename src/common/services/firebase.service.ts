import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firestore: admin.firestore.Firestore;
  private auth: admin.auth.Auth;
  private messaging: admin.messaging.Messaging;

  constructor(private configService: ConfigService) {
    const privateKey = configService.get<string>('FIREBASE_PRIVATE_KEY');

    if (!privateKey) {
      throw new Error('FIREBASE_PRIVATE_KEY 환경 변수가 설정되지 않았습니다.');
    }

    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: formattedPrivateKey,
        }),
        databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
      });
    }

    this.firestore = admin.firestore();
    this.auth = admin.auth();
    this.messaging = admin.messaging(); 
  }

  getFirestore() {
    return this.firestore;
  }

  getAuth() {
    return this.auth;
  }

  async sendToDevice(token: string, payload: admin.messaging.MessagingPayload): Promise<void> {
    try {
      await this.messaging.sendToDevice(token, payload);
      console.log(`푸시 알림 전송 완료: ${token}`);
    } catch (error) {
      console.error(`푸시 알림 전송 실패: ${error.message}`);
      throw new Error(`푸시 알림 전송 중 오류 발생: ${error.message}`);
    }
  }
}

