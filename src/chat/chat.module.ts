import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatResolver } from './chat.resolver';

@Module({
  providers: [ChatGateway, ChatResolver]
})
export class ChatModule {}