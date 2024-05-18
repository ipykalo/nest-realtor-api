import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ type: String })
  msg: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
