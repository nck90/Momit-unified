import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';

@Injectable()
export class CheckInService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async checkIn(createCheckInDto: CreateCheckInDto): Promise<any> {
    const { eventId, userId } = createCheckInDto;

    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const checkInRef = db.collection('checkins').doc();
    const checkInData = {
      eventId,
      userId,
      checkInTime: new Date(),
    };
    await checkInRef.set(checkInData);
    return { id: checkInRef.id, ...checkInData };
  }

  async checkOut(checkInId: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const checkInRef = db.collection('checkins').doc(checkInId);
    const checkInDoc = await checkInRef.get();
    if (!checkInDoc.exists) {
      throw new NotFoundException(`CheckIn with ID ${checkInId} not found`);
    }

    const updateData = { checkOutTime: new Date() };
    await checkInRef.update(updateData);
    return { id: checkInRef.id, ...checkInDoc.data(), ...updateData };
  }

  async findAllForEvent(eventId: string): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const checkInSnapshot = await db.collection('checkins').where('eventId', '==', eventId).get();
    return checkInSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 체크인 수정 기능 추가
  async updateCheckIn(checkInId: string, updateData: any): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const checkInRef = db.collection('checkins').doc(checkInId);
    const checkInDoc = await checkInRef.get();
  
    if (!checkInDoc.exists) {
      throw new NotFoundException(`CheckIn with ID ${checkInId} not found`);
    }
  
    // 업데이트할 데이터가 비어있는지 확인
    if (Object.keys(updateData).length === 0) {
      throw new Error('At least one field must be updated.');
    }
  
    await checkInRef.update(updateData);
    return { id: checkInRef.id, ...checkInDoc.data(), ...updateData };
  }
  // 체크인 삭제
  async deleteCheckIn(checkInId: string): Promise<void> {
    const db = this.firebaseService.getFirestore();
    const checkInRef = db.collection('checkins').doc(checkInId);
    const checkInDoc = await checkInRef.get();
    if (!checkInDoc.exists) {
      throw new NotFoundException(`CheckIn with ID ${checkInId} not found`);
    }
    await checkInRef.delete();
  }
}
