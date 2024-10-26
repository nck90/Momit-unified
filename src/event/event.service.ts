import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InviteParticipantDto } from './dto/invite-participant.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class EventService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createEventDto: CreateEventDto): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(); // 새 문서 ID 생성

    // QR 코드 생성
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({
      title: createEventDto.title,
      date: createEventDto.date,
      location: createEventDto.location,
    }));

    const newEvent = {
      ...createEventDto,
      id: eventRef.id,
      qrCodeUrl,
      participants: [], // 참가자 초기화
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await eventRef.set(newEvent); // Firestore에 저장
    return newEvent;
  }

  async inviteParticipant(eventId: string, inviteParticipantDto: InviteParticipantDto): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(eventId);

    const event = await eventRef.get();
    if (!event.exists) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const updatedEvent = event.data();
    updatedEvent.participants.push({ email: inviteParticipantDto.email }); // 참가자 추가
    updatedEvent.updatedAt = new Date();

    await eventRef.update(updatedEvent); // Firestore 업데이트
    return updatedEvent;
  }

  async findAll(): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const eventsSnapshot = await db.collection('events').get();
    const events = eventsSnapshot.docs.map(doc => doc.data());
    return events;
  }

  async findOne(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(id);
    const event = await eventRef.get();

    if (!event.exists) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event.data();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(id);

    const event = await eventRef.get();
    if (!event.exists) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const updatedEvent = {
      ...event.data(),
      ...updateEventDto,
      updatedAt: new Date(),
    };

    await eventRef.update(updatedEvent);
    return updatedEvent;
  }

  async remove(id: string): Promise<void> {
    const db = this.firebaseService.getFirestore();
    const eventRef = db.collection('events').doc(id);

    const event = await eventRef.get();
    if (!event.exists) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await eventRef.delete();
  }
}