import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop({ type: String, required: true })
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
