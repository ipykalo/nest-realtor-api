import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './models/home.schema';

@Injectable()
export class HomeRepository {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  getHomes() {
    return this.homeModel.find().exec();
  }

  async create() {
    return await this.homeModel.create({
      address: 'Medova pechera',
      bedrooms: 2,
      bathrooms: 2,
      city: 'Lviv',
      price: 10000,
      landSize: 2,
      propertyType: 'RESIDENTIAL',
      image: [{ url: 'some image' }],
    });
  }
}
