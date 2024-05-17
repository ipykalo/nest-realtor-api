import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home } from './models/home.schema';
import { Model } from 'mongoose';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  getHomes() {
    return this.homeModel.find().exec();
  }
}
