import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyType } from '../enums/property-type.enum';
import { Image } from './image.schema';

@Schema()
export class Home {
  @Prop({ type: String })
  address: string;

  @Prop({ type: Number })
  bedrooms: number;

  @Prop({ type: Number })
  bathrooms: number;

  @Prop({ type: String })
  city: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  landSize: number;

  @Prop({ type: String, enum: PropertyType })
  propertyType: PropertyType;

  @Prop({ type: [Image], _id: false })
  image: Image[];

  @Prop({ type: Date, default: new Date() })
  createTs: Date;

  @Prop({ type: Date })
  updateTs: Date;

  @Prop({ type: String })
  realtorId: string;

  _id?: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
