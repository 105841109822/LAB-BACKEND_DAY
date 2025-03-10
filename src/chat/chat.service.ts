import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private messages: { sender: string; message: string }[] = [];

    saveMessage(sender: string, message: string) {
        this.messages.push({ sender, message });
    }

    getMessages() {
        return this.messages;
    }
}
