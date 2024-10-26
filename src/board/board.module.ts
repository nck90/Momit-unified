import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { FirebaseService } from '../common/services/firebase.service'; // 파이어베이스 서비스 사용

@Module({
  controllers: [BoardController],
  providers: [BoardService, FirebaseService],
})
export class BoardModule {}