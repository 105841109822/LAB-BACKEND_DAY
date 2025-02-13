import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/socket',
})

export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Menangani Koneksi Klien
  async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
    socket.emit('chat-receive', { sender: 'Server', message: 'Welcome to the chat!' });
  }

  // Menangani Diskoneksi Klien
  async handleDisconnect(socket: Socket) {
    this.server.emit('chat-receive', { sender: 'Server', message: `${socket.id} disconnected` });
    console.log(`User disconnected: ${socket.id}`);
  }

  // Event Listener bertujuan untuk mendengarkan event yang dikirim oleh klien kemudian menanggapi event tersebut. dimana event ini akan dijalankan ketika klien mengirimkan pesan ke server. 
  // Menangani Pengiriman Pesan
  @SubscribeMessage('chat-send')
  async sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    const { message, room } = data;

    // Validasi Pesan Kosong
    if (!message) {
      socket.emit('chat-error', 'Message cannot be empty');
      return;
    }

    // Mengelola Pengiriman Pesan ke Room atau Global
    if (room) {
      socket.join(room);
      socket.emit('chat-receive', { sender: 'Server', message: `You joined room: ${room}` });
      this.server.to(room).emit('chat-receive', { sender: socket.id, message });
    } else {
      this.server.emit('chat-receive', { sender: socket.id, message });
    }
  }
  
}
