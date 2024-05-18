import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers() {
    return this.userModel.find().populate('home').exec();
  }

  async create(user: CreateUserDto) {
    return await this.userModel.create(user);
  }
}
