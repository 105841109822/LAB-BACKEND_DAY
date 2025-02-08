import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway(
  {
    cors : {
    origin : "*"
  },
    path : "/socket"
  }
)
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  Server : Server;

  // handleConnection berfungsi untuk mengetahui apakah user sudah terkoneksi maka akan memberikan output "connected"
  async handleConnection(socket : Socket) { 
    console.log("connected")
    }
  
  // handleDisconnect berfungsi untuk mengetahui apakah user sudah terputus maka akan memberikan output "disconnected"
    async handleDisconnect(socket : Socket) {
    console.log("disconnected")
    }

  // event listener untuk mengetahui apa yang diterima dari client dan akan mengirimkan pesan ke client lain
  @SubscribeMessage("chat-send")
    async sendMessage(socket : Socket, data : any) { 
      const {message} = data
      this.Server.emit("chat-receive", message)
    }
  
}
