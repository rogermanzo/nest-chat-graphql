import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field()
  status: string;
}