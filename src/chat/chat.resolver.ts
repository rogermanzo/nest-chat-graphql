import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ChatGateway } from './chat.gateway';
import { MessageResponse } from './chat.graphql';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Mutation(() => MessageResponse)
  async sendMessage(
    @Args('content') content: string
  ): Promise<MessageResponse> {
    this.chatGateway.sendMessageToClients(content);
    return { status: `Mensaje enviado: "${content}"` };
  }
}