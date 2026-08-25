import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const SOCKET_EVENTS = {
  WATCH_ROOM: 'WACTH_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
};

@WebSocketGateway({
  cors: { origin: '*' }, // 生产环境请配置更严格的 CORS
  namespace: 'room', // 用命名空间隔离业务
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  // 处理客户端连接
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 处理客户端断开
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.WATCH_ROOM)
  handleWatchRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client watching room: ${data.roomId} ${client.id}`, data);
  }

  @SubscribeMessage(SOCKET_EVENTS.LEAVE_ROOM)
  handleLeaveRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client leaving room: ${data.roomId} ${client.id}`, data);
  }
}
