import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'], // Fuerza usar WebSocket puro
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket // ¡Inyecta el cliente correctamente!
  ) {
    // Emitir a TODOS los clientes EXCEPTO al que envió el mensaje
    client.broadcast.emit('message', {
      sender: client.id,
      message: data
    });

    // Respuesta solo al remitente
    return { status: 'Mensaje enviado a otros' };
  }

  sendMessageToClients(content: string, senderId?: string) {
    this.server.emit('message', {
      sender: senderId || 'system',
      message: content,
      timestamp: new Date().toISOString()
    });
  }

}