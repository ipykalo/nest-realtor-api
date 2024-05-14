import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Home {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  rooms: number;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
