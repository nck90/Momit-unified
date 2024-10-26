import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<any> {
    const { userId, title, message, notificationType, eventId } = createNotificationDto;

    const db = this.firebaseService.getFirestore();
    const notificationRef = db.collection('notifications').doc();

    const notificationData = {
      userId,
      title,
      message,
      notificationType,
      ...(eventId && { eventId }),
      createdAt: new Date(),
      read: false,
    };

    await notificationRef.set(notificationData);
    return { id: notificationRef.id, ...notificationData };
  }

  async getNotifications(userId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const notificationSnapshot = await db.collection('notifications')
      .where('userId', '==', userId)
      .get();
    
    return notificationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async markAsRead(notificationId: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const notificationRef = db.collection('notifications').doc(notificationId);
    const notificationDoc = await notificationRef.get();
    
    if (!notificationDoc.exists) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }
  
    // read 상태를 true로 업데이트
    await notificationRef.update({ read: true });
  
    // 업데이트 후 최신 데이터를 다시 가져옴
    const updatedNotificationDoc = await notificationRef.get();
    const updatedNotificationData = updatedNotificationDoc.data();
  
    // 업데이트된 데이터를 반환
    return { id: notificationId, ...updatedNotificationData };
  }
  async sendPushNotification(userToken: string, title: string, message: string) {
    const payload = {
      notification: {
        title,
        body: message,
      },
    };
    await this.firebaseService.sendToDevice(userToken, payload);
  }
}