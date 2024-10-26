// src/notification/notification.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(userId).emit('notification', notification);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    client.join(userId);
  }


  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
  
    if (Array.isArray(userId)) {
      userId.forEach(id => client.leave(id));
    } else {
      client.leave(userId as string);
    }
  }
  @SubscribeMessage('sendNotification')
  handleSendNotification(@MessageBody() payload: { userId: string, notification: any }) {
    this.sendNotificationToUser(payload.userId, payload.notification);
  }
}