import { Injectable, NotFoundException } from '@nestjs/common';
import { HomeRepository } from './home.repository';
import { HomeResponseDto } from './dtos/home-response.dto';
import { HomeRequestDto } from './dtos/home-request.dto';

@Injectable()
export class HomeService {
  constructor(private homeRepository: HomeRepository) {}

  getHomes(): Promise<HomeResponseDto[]> {
    return this.homeRepository.getHomes();
  }

  getHome(id: string): Promise<HomeResponseDto> {
    return this.homeRepository.getHome(id);
  }

  create(home: HomeRequestDto): Promise<HomeResponseDto> {
    return this.homeRepository.create(home);
  }

  async update(id: string, home: HomeRequestDto): Promise<HomeResponseDto> {
    const oldHome = await this.homeRepository.getHome(id);

    if (!oldHome) {
      throw new NotFoundException('Home not found.');
    }

    return await this.homeRepository.updateOne(id, {
      ...oldHome,
      ...home,
    });
  }

  delete(id: string): Promise<HomeResponseDto> {
    return this.homeRepository.deleteOne(id);
  }
}
