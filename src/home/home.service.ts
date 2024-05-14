import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Home } from './schems/home.schema';
import { Model } from 'mongoose';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  getHomes() {
    console.log(this.homeModel);
    return this.homeModel.find().exec();
  }
}
