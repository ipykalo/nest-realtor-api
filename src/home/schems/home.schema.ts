import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PropertyType } from '../enums/propertry-type.enum';

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

  @Prop({ type: Date })
  createTs: Date;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  landSize: number;

  @Prop({ type: String, enum: PropertyType })
  propertyType: PropertyType;

  _id?: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
