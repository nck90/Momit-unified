import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CheckInGateway {
  @WebSocketServer()
  server: Server;

  notifyCheckIn(eventId: string, userId: string) {
    this.server.emit('checkin', { eventId, userId });
  }

  notifyCheckOut(eventId: string, userId: string) {
    this.server.emit('checkout', { eventId, userId });
  }
}