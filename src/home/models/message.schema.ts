import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ type: String })
  msg: string;
}
