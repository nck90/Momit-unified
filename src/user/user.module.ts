import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseService } from '../common/services/firebase.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseService], // FirebaseService 추가
  exports: [UserService], // 다른 모듈에서 사용할 수 있게 export
})
export class UserModule {}