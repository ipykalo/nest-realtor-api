import { Injectable, NotFoundException } from '@nestjs/common';
import { HomeRepository } from './home.repository';
import { HomeResponseDto } from './dtos/home-response.dto';
import { CreateHomeRequestDto } from './dtos/create-home-request.dto';
import { FilterHomes } from './interfaces/filter-homes.interface';
import { UpdateHomeRequestDto } from './dtos/update-home-request.dto';

@Injectable()
export class HomeService {
  constructor(private homeRepository: HomeRepository) {}

  getHomes({
    city,
    maxPrice,
    minPrice,
    propertyType,
  }: FilterHomes): Promise<HomeResponseDto[]> {
    return this.homeRepository.getHomes({
      city,
      maxPrice,
      minPrice,
      propertyType,
    });
  }

  getHome(id: string): Promise<HomeResponseDto> {
    return this.homeRepository.getHome(id);
  }

  create(home: CreateHomeRequestDto): Promise<HomeResponseDto> {
    return this.homeRepository.create(home);
  }

  async update(
    id: string,
    home: UpdateHomeRequestDto,
  ): Promise<HomeResponseDto> {
    const oldHome = await this.homeRepository.getHome(id);

    if (!oldHome) {
      throw new NotFoundException('Home not found.');
    }

    return this.homeRepository.updateOne(id, {
      ...oldHome,
      ...home,
    });
  }

  delete(id: string): Promise<HomeResponseDto> {
    return this.homeRepository.deleteOne(id);
  }
}
