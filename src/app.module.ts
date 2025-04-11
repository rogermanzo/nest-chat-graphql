import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Ruta absoluta
      playground: true,
    }), ChatModule
  ],
  providers: [ChatGateway, AppResolver], // Registrar el resolver aquí
})
export class AppModule {}