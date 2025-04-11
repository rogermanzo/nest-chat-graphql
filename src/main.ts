import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración CORS para WebSocket
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
  });
  
  // Usar el adaptador de Socket.IO
  app.useWebSocketAdapter(new IoAdapter(app));
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();