import { Prop, Schema } from '@nestjs/mongoose';
import { UserType } from '../enums/user-type.enum';

@Schema()
export class User {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ enum: UserType, type: String })
  userType: UserType;

  @Prop({ type: Date, default: new Date() })
  createTs: Date;

  @Prop({ type: Date })
  updateTs: Date;
}
