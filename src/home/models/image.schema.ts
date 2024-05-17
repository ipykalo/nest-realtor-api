import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop({ type: String, required: true })
  url: string;
}
