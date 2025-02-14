import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import path from 'path';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private rooms = new Map<string, Set<string>>(); // room -> set of usernames
  private socketToUser = new Map<string, { username: string, room: string }>();

  handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    const user = this.socketToUser.get(socket.id);
    if (user) {
      this.socketToUser.delete(socket.id);
      const roomUsers = this.rooms.get(user.room);
      roomUsers?.delete(user.username);
      this.updateRoomUsers(user.room);
      this.server.to(user.room).emit('chat-receive', {
        from: 'System',
        message: `${user.username} has left the chat.`
      });
    }
    console.log(`User disconnected: ${socket.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(socket: Socket, payload: { username: string, room: string }) {
    const { username, room } = payload;
    socket.join(room);
    if (!this.rooms.has(room)) {
      this.rooms.set(room, new Set());
    }
    this.rooms.get(room)?.add(username);
    this.socketToUser.set(socket.id, { username, room });
    this.updateRoomUsers(room);
    this.server.to(room).emit('chat-receive', {
      from: 'System',
      message: `${username} joined the room.`
    });
  }

  @SubscribeMessage('group-message')
  handleGroupMessage(socket: Socket, payload: { room: string, message: string }) {
    const user = this.socketToUser.get(socket.id);
    if (user) {
      this.server.to(payload.room).emit('chat-receive', {
        from: user.username,
        message: payload.message
      });
    }
  }

  private updateRoomUsers(room: string) {
    const users = Array.from(this.rooms.get(room) || []);
    this.server.to(room).emit('user-list', users);
  }
}