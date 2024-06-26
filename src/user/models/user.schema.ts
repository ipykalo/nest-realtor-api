import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../../shared/enums/user-type.enum';

import mongoose from 'mongoose';
import { Home } from '../../home/models/home.schema';

@Schema()
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ enum: UserType, type: String })
  userType: UserType;

  @Prop({ type: Date, default: new Date() })
  createTs: Date;

  @Prop({ type: Date })
  updateTs: Date;

  @Prop({ type: [mongoose.Types.ObjectId], ref: Home.name })
  home: Home[];
}

export const UserSchema = SchemaFactory.createForClass(User);
