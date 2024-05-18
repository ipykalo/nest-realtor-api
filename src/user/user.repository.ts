import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { User } from './models/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers() {
    return this.userModel.find().populate('home').exec();
  }

  async create(user: CreateUserDto) {
    return await this.userModel.create(user);
  }
}
