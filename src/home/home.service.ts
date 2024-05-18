import { Injectable } from '@nestjs/common';
import { HomeRepository } from './home.repository';

@Injectable()
export class HomeService {
  constructor(private homeRepository: HomeRepository) {}

  getHomes() {
    return this.homeRepository.getHomes();
  }

  async create() {
    return await this.homeRepository.create();
  }
}
