import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './models/home.schema';
import { HomeResponseDto } from './dtos/home-response.dto';
import { HomeRequestDto } from './dtos/home-request.dto';
import { FilterHomes } from './interfaces/filter-homes.interface';

@Injectable()
export class HomeRepository {
  constructor(@InjectModel(Home.name) private homeModel: Model<Home>) {}

  getHomes({
    city,
    maxPrice,
    minPrice,
    propertyType,
  }: FilterHomes): Promise<HomeResponseDto[]> {
    return this.homeModel
      .find({
        $and: [
          (city && { city }) || {},
          (propertyType && { propertyType }) || {},
          (maxPrice && { price: { $lte: maxPrice } }) || {},
          (minPrice && { price: { $gte: minPrice } }) || {},
        ],
      })
      .exec();
  }

  getHome(_id: string): Promise<HomeResponseDto> {
    return this.homeModel.findOne({ _id }, null, { lean: true }).exec();
  }

  create(home: HomeRequestDto): Promise<HomeResponseDto> {
    return this.homeModel.create(home);
  }

  updateOne(_id: string, home: HomeRequestDto): Promise<HomeResponseDto> {
    return this.homeModel.findByIdAndUpdate(_id, home, { new: true }).exec();
  }

  deleteOne(_id: string): Promise<HomeResponseDto> {
    return this.homeModel.findOneAndDelete({ _id }).exec();
  }
}
