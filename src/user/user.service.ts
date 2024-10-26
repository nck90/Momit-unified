import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../common/services/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private firebaseService: FirebaseService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(createUserDto.email);
    await userRef.set(createUserDto);
    return createUserDto;
  }

  async findAll(): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => doc.data());
    return users;
  }

  async findById(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return doc.data();
  }

  async findByEmail(email: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();

    // 사용자 존재 여부를 확인할 때 null을 반환하여 새 사용자 생성 가능하도록 함
    if (!doc.exists) {
      return null; // NotFoundException을 던지지 않고 null 반환
    }

    return doc.data();
  }

  // 유틸리티 함수: 중첩된 객체를 평면화하여 Firestore에 맞게 변환
  private flattenObject(ob: any, prefix = ''): any {
    return Object.keys(ob).reduce((toReturn, k) => {
      const pre = prefix.length ? `${prefix}.` : '';
      if (typeof ob[k] === 'object' && ob[k] !== null) {
        Object.assign(toReturn, this.flattenObject(ob[k], pre + k));
      } else {
        toReturn[pre + k] = ob[k];
      }
      return toReturn;
    }, {});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(id);

    // updateUserDto를 평면화하여 Firestore에 업데이트
    const flatUpdateData = this.flattenObject(updateUserDto);
    await userRef.update(flatUpdateData);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await userRef.delete();
  }
}